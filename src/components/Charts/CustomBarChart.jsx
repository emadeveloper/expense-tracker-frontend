import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

const CustomBarChart = ({ data, type }) => {

    // Function to alternate colors
    const getAmountStyles = () =>
        type === "income" ? "#22c55e" : "#ef4444";

    const CustomTooltip = ({ active, payload}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-blue-800 mb-1">{payload[0].payload.month}</p>
                    <p className="text-sm text-gray-600">Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span></p>
                </div>
            );
        };
        return null;
    };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 14, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 14, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getAmountStyles()} />
            ))};
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
