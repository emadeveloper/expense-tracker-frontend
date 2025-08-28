import React from "react";

const CustomLegend = ({ payload }) => {
    console.log("Payload received: " , payload)

    if(!payload || payload.length === 0) {
        return null;
    }

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
            {entry.payload.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
