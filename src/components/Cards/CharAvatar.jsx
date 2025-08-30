import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-gray-800 font-medium bg-gray-200 `}
    >
      <span className={`${style || ""} font-bold`}>
        {getInitials(fullName || "")}
      </span>
    </div>
  );
};

export default CharAvatar;
