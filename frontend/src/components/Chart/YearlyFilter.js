import React from "react";

const YearlyFilter = () => {
  return (
    <form>
      <select name="year" id="year">
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YearlyFilter;
