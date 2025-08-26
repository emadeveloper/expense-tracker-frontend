import React from 'react';
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from './TransactionInfoCard';

const RecentTransactionCard = ({title, transactions, type, onSeeMore }) => {
    if (!transactions || transactions.length === 0) {
        return (
            <div className='card'>
                <h5 className='text-lg'>{title}</h5>
                <div className='mt-6 text-gray-500'>
                    <p>No recent transactions</p>   
                </div>
                <button>
                    See All <LuArrowRight className= 'text-base' />
                </button>
            </div>
        );
    }

    const recentTransactions = transactions[0];

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>{title}</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className= 'text-base' />
            </button>
        </div>

        <div className='mt-6'>
            <TransactionInfoCard
                key={recentTransactions.id}
                title={recentTransactions.title}
                icon={recentTransactions.icon}
                date={moment(recentTransactions.date).format('MMM DD, YYYY')}
                amount={recentTransactions.amount}
                type={type}
                hideDeleteBtn={true}
            />
        </div>
    </div>
  );
};

export default RecentTransactionCard;