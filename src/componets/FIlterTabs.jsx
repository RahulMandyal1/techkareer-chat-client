import React from "react";

const FilterTabs = () => {
  return (
    <div className="flex p-2 border-b border-gray-300">
      {["All", "Unread", "Archived", "Blocked"].map((tab) => (
        <button
          key={tab}
          className="px-4 py-2 mr-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
