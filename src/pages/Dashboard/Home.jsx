import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandSeparators } from "../../utils/helper";
import { LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import RecentTransactionCard from "../../components/Dashboard/RecentTransactionCard";
import FinancialOverview from "../../components/Dashboard/FinancialOverview";
import { Last30DaysData } from "../../components/Dashboard/Last30DaysData";
import LastTransactions from "../../components/Dashboard/LastTransactions";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [lastFiveIncomes, setFiveLastIncomes] = useState(null);
  const [lastFiveExpenses, setFiveLastExpenses] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get("/stats/summary");

      if (response.data) {
        console.log(response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLast5Incomes = async () => {
    try {
      if (loading) return;

      setLoading(true);

      const response = await axiosInstance.get("incomes/my-incomes/last-5");
      if (response.data) {
        console.log(response.data);
        setFiveLastIncomes(response.data);
      }
    } catch (error) {
      console.log("Error fetching last 5 incomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLast5Expenses = async () => {
    try {
      if (loading) return;

      setLoading(true);

      const response = await axiosInstance.get('/expenses/my-expenses/last-5');
      if (response.data) {
        console.log(response.data);
        setFiveLastExpenses(response.data);
      }
    } catch (error) {
      console.log('Error fetching last 5 expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  useEffect(() => {
    fetchLast5Incomes();
    return () => {};
  }, []);
  
  useEffect(() => {
    fetchLast5Expenses();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h2>Welcome, {dashboardData?.user.username}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.balance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Incomes"
            value={addThousandSeparators(dashboardData?.totalIncomes || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeparators(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />

          <RecentTransactionCard
            title="Latest Expense"
            transactions={
              dashboardData?.latestExpense ? [dashboardData.latestExpense] : []
            }
            onSeeMore={() => navigate("/expenses/my-expenses")}
            onAddNew={() => navigate("/expenses")}
            type={"expense"}
          />

          <RecentTransactionCard
            title="Latest Income"
            transactions={
              dashboardData?.latestIncome ? [dashboardData.latestIncome] : []
            }
            onSeeMore={() => navigate("/incomes")}
            onAddNew={() => navigate("/incomes")}
            type={"income"}
          />
          
          <RecentTransactionCard
            title="Max Expense"
            transactions={
              dashboardData?.expenses.max ? [dashboardData.expenses.max] : []
            }
            onSeeMore={() => navigate("/expenses/my-expenses")}
            onAddNew={() => navigate("/expenses-add")}
            type={"expense"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <LastTransactions
            transactions={lastFiveIncomes || []}
            title="Last 5 Incomes"
            onSeeMore={() => navigate("/incomes")}
            type="income"
          />
          
          <LastTransactions
            transactions={lastFiveExpenses || []}
            title="Last 5 Expenses"
            onSeeMore={() => navigate("/expenses")}
            type="expense"
          />

          <FinancialOverview
            totalBalance={dashboardData?.balance || 0}
            totalIncome={dashboardData?.totalIncomes || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <Last30DaysData
            data={dashboardData?.monthlyExpenses || []}
            title="Last 30 Days Expenses"
            type="expense"
          />

          <Last30DaysData
            data={dashboardData?.monthlyIncomes || []}
            title="Last 30 Days Incomes"
            type="income"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
