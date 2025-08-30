import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  const [activeItem, setActiveItem] = useState(null);

  const isEmpty =
    !data || data.length === 0 || data.every((item) => item.amount === 0);

  const chartData = isEmpty ? [{ name: "No Data", amount: 1 }] : data;

  const centerTitle = isEmpty
    ? "No Data"
    : activeItem
    ? activeItem.name
    : label;

  const centerValue = isEmpty
    ? ""
    : activeItem
    ? `$${activeItem.value}`
    : totalAmount;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          onMouseEnter={isEmpty ? undefined : (d) => setActiveItem(d)}
          onMouseLeave={isEmpty ? undefined : () => setActiveItem(null)}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={isEmpty ? "#e5e7eb" : colors[index % colors.length]}
            />
          ))}

          <Label
            position="center"
            content={({ viewBox }) => {
              const { cx, cy } = viewBox;
              return (
                <g>
                  <AnimatePresence mode="wait">
                    <motion.text
                      key={centerTitle}
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="14"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {centerTitle}
                    </motion.text>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.text
                      key={centerValue}
                      x={cx}
                      y={cy + 20}
                      textAnchor="middle"
                      fill="#333"
                      fontSize="24"
                      fontWeight="600"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {centerValue}
                    </motion.text>
                  </AnimatePresence>
                </g>
              );
            }}
          />
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend content={CustomLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
