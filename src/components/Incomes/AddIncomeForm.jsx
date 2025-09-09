import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopUp from '../EmojiPickerPopUp';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        amount: '',
        title: '',
        date: '',
        description: '',
        category: '',
        icon: '',
    })

    const handleChange = (key, value) => setIncome ({...income, [key]: value});
  
    return (
    <div className=''>

        <EmojiPickerPopUp
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />
        <Input
            value={income.source}
            onChange={({target}) => handleChange('title', target.value)}
            label='Income Title'
            placeholder='Freelance, salary, job, etc'
            type='text'
            />
        <Input
            value={income.category}
            onChange={({target}) => handleChange('category', target.value)}
            label='Income Category'
            placeholder='Salary, Business, Investment, etc.'
            type='text'
            />
        <Input
            value={income.description}
            onChange={({target}) => handleChange('description', target.value)}
            label='Income Description'
            placeholder='Description for your income...'
            type='text'
            />
        <Input
            value={income.amount}
            onChange={({target}) => handleChange('amount', target.value)}
            label='Amount'
            placeholder='$1000'
            type='number'
            />
        <Input
            value={income.date}
            onChange={({target}) => handleChange('date', target.value)}
            label='Date'
            placeholder=''
            type='date'
            />

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn add-btn-fill' onClick={() => onAddIncome(income)}>
                    Add Income
                </button>
            </div>
    </div>
  );
};

export default AddIncomeForm;