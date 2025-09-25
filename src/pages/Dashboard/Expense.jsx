import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ExpenseOverview from "../../components/Expenses/ExpenseOverview";
import ExpenseList from "../../components/Expenses/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expenses/AddExpenseForm";
import UpdateExpenseForm from "../../components/Expenses/UpdateExpenseForm";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/Cards/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openUpdateModal, setOpenUpdateModal] = useState({
    show: false,
    data: null,
  });

  // Get All Expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/expenses/my-expenses");
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { amount, title, date, description, category, icon } = expense;

    // Validation Checks
    if (!title.trim()) {
      toast.error("Expense title is required");
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!category.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post("/expenses/add-expense", {
        amount,
        title,
        date,
        description,
        category,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense: ",
        error.response?.data || error.message
      );
      toast.error("Error adding expense. Please try again.");
    }
  };

  // Handle Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense Deleted Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense: ",
        error.response?.data || error.message
      );
      toast.error("Error deleting expense. Please try again.");
    }
  };

  // Handle Update Expense
  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      await axiosInstance.put(`/expenses/${id}`, updatedExpense);
      setOpenUpdateModal({ show: false, data: null });
      toast.success("Expense updated successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error updating expense: ",
        error.response?.data || error.message
      );
      toast.error("Error updating expense. Please try again.");
    }
  };

  // Handle Download Report
  const handleDownloadReport = async () => {};

  // Get all expenses

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>

        {/* Get All Expenses */}
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownloadReport={handleDownloadReport}
          onUpdate={(id) => setOpenUpdateModal({ show: true, data: id })}
        />
      </div>

      {/* Modals */}
      <Modal
        isOpen={openUpdateModal.show}
        onClose={() => setOpenUpdateModal({ show: false, data: null })}
        title="Update Expense"
      >
        <UpdateExpenseForm
          expense={openUpdateModal.data}
          onUpdate={handleUpdateExpense}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
        />
      </Modal>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;
