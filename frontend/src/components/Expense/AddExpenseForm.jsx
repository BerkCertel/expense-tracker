import { useState } from "react";
import EmojiPickerPopup from "../Inputs/EmojiPickerPopup";
import Input from "../Inputs/Input";

function AddExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value ?? "" }); // undefined ise boş string ata
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(SelectedIcon) => handleChange("icon", SelectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="0.00"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="YYYY-MM-DD"
        type="date"
      />
    </div>
  );
}

export default AddExpenseForm;
