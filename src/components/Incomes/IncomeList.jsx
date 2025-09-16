import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload, onUpdate }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((item) => (
                <TransactionInfoCard
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format('MMM DD, YYYY')}
                    amount={item.amount}
                    type={'income'}
                    onDelete={() => onDelete(item.id)}
                    onUpdate={() => onUpdate(item)}
                    />
            ))}
        </div>
    </div>
  )
}

export default IncomeList;