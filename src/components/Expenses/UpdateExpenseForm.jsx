import React, { useEffect, useRef, useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";

const UpdateExpenseForm = ({ expense, onUpdate }) => {
    const isInitialized = useRef(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setFormData({ ...formData, [key]: value });

  const handleEmojiChange = (selectedIcon) => {
    setFormData({ ...formData, icon: selectedIcon });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData.id, formData);
  };

  useEffect(() => {
    if (expense && !isInitialized.current) {
      setFormData({
        id: expense.id || "",
        title: expense.title || "",
        category: expense.category || "",
        description: expense.description || "",
        amount: expense.amount || "",
        date: expense.date || "",
        icon: expense.icon || "",
      });
      isInitialized.current = true;
    }
  }, [expense]);

  return (
    <form className="" onSubmit={handleSubmit}>
      <EmojiPickerPopUp
        icon={formData.icon}
        onSelect={handleEmojiChange}
      />

      <Input
        name="title"
        value={formData.title || ""}
        onChange={({ target }) => handleChange("title", target.value)}
        label="Expense Title"
        placeholder="Shopping, Groceries, Rent, etc."
        type="text"
      />
      <Input
        name="category"
        value={formData.category || ""}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Rent, Food, Variable Expenses, Etc."
        type="text"
      />
      <Input
        name="description"
        value={formData.description || ""}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Expense Description"
        placeholder="Description for your expense..."
        type="text"
      />
      <Input
        name="amount"
        value={formData.amount || ""}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="$1000"
        type="number"
      />
      <Input
        name="date"
        value={formData.date || ""}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button type="submit" className="add-btn add-btn-fill">
          Update Expense
        </button>
      </div>
    </form>
  );
};

export default UpdateExpenseForm;
