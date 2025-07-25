const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    if (income.length === 0) {
      return res.status(404).json({ message: "No income data found." });
    }

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);

    if (!deletedIncome) {
      return res.status(404).json({
        message: `No income found with ID ${req.params.id}.`,
      });
    }

    res.status(200).json({
      message: `Income with ID ${req.params.id} was successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    if (income.length === 0) {
      return res.status(404).json({ message: "No income data found." });
    }

    // Prepare data for excel

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, `income_details.xlsx`);
    res.download(`income_details.xlsx`);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
