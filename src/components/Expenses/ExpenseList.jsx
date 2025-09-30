import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
import ExportPdfButton from '../Pdf/ExportPdfButton';

const ExpenseList = ({ transactions, onDelete, onUpdate }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expenses</h5>

            {/* <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download
            </button> */}
            <ExportPdfButton data={transactions || [] } />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((item) => (
                <TransactionInfoCard
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format('MMM DD, YYYY')}
                    amount={item.amount}
                    type={'expense'}
                    onDelete={() => onDelete(item.id)}
                    onUpdate={() => onUpdate(item)}
                    />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList;