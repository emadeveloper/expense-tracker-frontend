import React from "react";
import { LuArrowRight } from "react-icons/lu";
import LastFiveCard from "../Cards/LastFiveCard";

const LastTransactions = ({
  title,
  transactions,
  type,
  onSeeMore,
  onAddNew,
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card">
        <h5 className="text-lg">{title}</h5>
        <div className="mt-6 text-gray-500">
          <p className="text-sm mb-8">No recent transactions</p>
        </div>
        <button className="card-btn" onClick={onAddNew}>
          Add new {type} <LuArrowRight className="text-base" />
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <LastFiveCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            date={item.date}
            amount={item.amount}
            type={type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  );
};

export default LastTransactions;
