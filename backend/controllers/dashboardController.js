const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income & expense for the user

    const totalIncome = await Income.aggregate({
      $match: { userId: userObjectId },
      $group: { _id: null, total: { $sum: "$amount" } },
    });

    console.log("Total Income:", { totalIncome, userId: userObjectId(userId) });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get income transactions in the last 60 days

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 60 days

    const incomeLast60Days = await last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Get income transactions in the last 30 days

    const last30DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 30 days

    const incomeLast30Days = await last30DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // fetch last 5 transactions for income + expense

    const lastTransactions = [
      ...(await Income.find({ userId })
        .sort({ date: -1 })
        .limit(5)
        .map((txn) => ({
          ...txn.toObject(),
          type: "income",
        }))),

      ...(await Expense.find({ userId })
        .sort({ date: -1 })
        .limit(5)
        .map((txn) => ({
          ...txn.toObject(),
          type: "expense",
        }))),
    ].sort((a, b) => b.date - a.date); // Sort latest first

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      expenseLast30Days: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      incomeLast30Days: {
        total: incomeLast30Days,
        transactions: last30DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
