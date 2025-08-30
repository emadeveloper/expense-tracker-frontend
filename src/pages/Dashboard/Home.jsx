import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandSeparators } from '../../utils/helper';
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import RecentTransactionCard from '../../components/Dashboard/RecentTransactionCard';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [ dashboardData, setDashboardData ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    
    setLoading(true);

    try {
      const response = await axiosInstance.get('/stats/summary');
      
      if (response.data) {
        console.log(response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  },[]);

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <h2>Welcome, {dashboardData?.user.username}!</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label= 'Total Balance'
            value={addThousandSeparators(dashboardData?.balance || 0)}
            color='bg-primary'
            />
          
          <InfoCard
            icon={<LuWalletMinimal />}
            label= 'Total Incomes'
            value={addThousandSeparators(dashboardData?.income || 0)}
            color='bg-green-500'
            />
          
          <InfoCard
            icon={<LuHandCoins />}
            label= 'Total Expenses'
            value={addThousandSeparators(dashboardData?.expense || 0)}
            color='bg-red-500'
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          <RecentTransactionCard
            title='Latest Expense'
            transactions={dashboardData?.latestExpense ? [dashboardData.latestExpense] : []} 
            onSeeMore={() => navigate('/expenses/my-expenses')}
            onAddNew={() => navigate('/expenses')}
            type={'expense'}
          />
          <RecentTransactionCard
            title='Latest Income'
            transactions={dashboardData?.latestIncome ? [dashboardData.latestIncome] : []} 
            onSeeMore={() => navigate('/incomes/my-incomes')}
            onAddNew={() => navigate('/incomes')}
            type={'income'}
          />

          <FinancialOverview
            totalBalance={dashboardData?.balance || 0}
            totalIncome={dashboardData?.income || 0}
            totalExpense={dashboardData?.expense || 0}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home;