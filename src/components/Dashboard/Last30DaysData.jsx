import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

export const Last30DaysData = ({ data, title, type }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {}
    }, [data]);


  return (
    <div className='card md:col-span-3'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>{title}</h5>
        </div>

        <CustomBarChart data={chartData} type={type} />
    </div>
  );
};
