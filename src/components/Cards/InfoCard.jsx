import React from "react";
import { formatCurrency } from "../../utils/helper";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center justify-center gap-4 bg-white p-3 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
      <span className="text-md">$ {formatCurrency(value)}</span>
    </div>
  );
};

export default InfoCard;
