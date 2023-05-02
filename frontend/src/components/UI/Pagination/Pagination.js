import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ transactionsPerPage, totalTransactions, paginate }) => {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(totalTransactions / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  console.log();
  return (
    <nav className={classes.pagination}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
