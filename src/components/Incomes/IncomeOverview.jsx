import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-sm text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
           Add Income
          <LuPlus className="text-lg" />
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} type='income' />
      </div>
    </div>
  );
};

export default IncomeOverview;
