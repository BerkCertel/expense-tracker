const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Get All Expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (expense.length === 0) {
      return res.status(404).json({ message: "No expense data found." });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: `No expense found with ID ${req.params.id}.`,
      });
    }

    res.status(200).json({
      message: `Expense with ID ${req.params.id} was successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (expense.length === 0) {
      return res.status(404).json({ message: "No expense data found." });
    }

    // Prepare data for excel

    const data = expense.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, `expense_details.xlsx`);
    res.download(`expense_details.xlsx`);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
