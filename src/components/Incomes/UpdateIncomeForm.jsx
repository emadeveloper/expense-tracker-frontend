import React, { useEffect, useRef, useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";

const UpdateIncomeForm = ({ income, onUpdate }) => {
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
    if (income && !isInitialized.current) {
      setFormData({
        id: income.id || "",
        title: income.title || "",
        category: income.category || "",
        description: income.description || "",
        amount: income.amount || "",
        date: income.date || "",
        icon: income.icon || "",
      });
      isInitialized.current = true;
    }
  }, [income]);

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
        label="Income Title"
        placeholder="Freelance, salary, job, etc"
        type="text"
      />
      <Input
        name="category"
        value={formData.category || ""}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Income Category"
        placeholder="Salary, Business, Investment, etc."
        type="text"
      />
      <Input
        name="description"
        value={formData.description || ""}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Income Description"
        placeholder="Description for your income..."
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
          Update Income
        </button>
      </div>
    </form>
  );
};

export default UpdateIncomeForm;
