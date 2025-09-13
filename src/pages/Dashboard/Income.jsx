import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import IncomeOverview from "../../components/Incomes/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Incomes/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Incomes/IncomeList";
import DeleteAlert from "../../components/Cards/DeleteAlert";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get all incomes
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get("/incomes/my-incomes");

      if (response.data) {
        console.log(response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { amount, title, date, description, category, icon } = income;

    // Validation Checks
    if (!title.trim()) {
      toast.error("Income source is required");
      return;
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
      await axiosInstance.post("/incomes/add-income", {
        amount,
        title,
        date,
        description,
        category,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
      toast.error("Error adding income. Please try again.");
    }
  };

  // Handle Delete Income
  const handleDeleteIncome = async (incomeId) => {
    try {
      await axiosInstance.delete(`/incomes/${incomeId}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
      toast.error("Error deleting income. Please try again.");
    }
  };

  // Handle Download Income Report
  const handleDownloadIncomeReport = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownloadReport={handleDownloadIncomeReport}
        />

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null})}
          title='Delete Income'
        >
          <DeleteAlert
            content='Are you sure you want to delete this income?'
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
