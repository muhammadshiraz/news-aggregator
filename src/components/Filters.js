import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const applyFilters = () => {
    onFilter({ category, date });
  };

  return (
    <div className="filters">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="health">Health</option>
        <option value="entertainment">Entertainment</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
