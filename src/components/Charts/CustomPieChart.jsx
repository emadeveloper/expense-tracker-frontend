import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Ajustes dinámicos para distintos tamaños
  const chartHeight = isMobile ? 260 : isTablet ? 300 : 340;
  const outerRadius = isMobile ? 80 : isTablet ? 100 : 130;
  const innerRadius = isMobile ? 55 : isTablet ? 70 : 100;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ResponsiveContainer
        width={isTablet ? "90%" : "100%"}
        height={chartHeight}
        className="mx-auto"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
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
                        fontSize={isMobile ? 12 : 14}
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
                        fontSize={isMobile ? 18 : 22}
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
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend payload={chartData} colors={colors} />
    </div>
  );
};

export default CustomPieChart;
