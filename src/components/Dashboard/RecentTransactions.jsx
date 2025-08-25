import moment from 'moment';
import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Expense</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.map((item) => (
                <TransactionInfoCard
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format('MMM DD, YYYY')}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn={true}
                    />
            ))}
        </div>
    </div>
  )
};

export default RecentTransactions;