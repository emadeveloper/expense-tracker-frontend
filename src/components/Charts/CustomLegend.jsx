/* import React from "react";

const CustomLegend = ({ payload }) => {
    
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
          <span className="text-xs text-gr-700 font-medium whitespace-nowrap">
            {entry.payload.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
 */
import React from "react";

const CustomLegend = ({ payload, colors }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-5 w-full max-w-[400px]">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 text-xs sm:text-sm"
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <span className="text-gray-700 font-medium truncate max-w-[120px] sm:max-w-none">
            {entry.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
