import React, { Fragment, useEffect, useState } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import classes from "./Expense.module.css";
import axios from "axios";
import ExpensesList from "./ExpenseList";
import Pagination from "../../Pagination/Pagination";

const Expense = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios.get("http://localhost:8000/expenses").then((res) => {
      setExpenses(res.data.expenses);
      setTotalExpense(res.data.totalExpense);
    });
  }, [totalExpense, expenses.length]);
  return (
    <Fragment>
      <div className={classes.container}>
        <IncomeExpenseCard type={"Expense"} amount={totalExpense} />
        <ul>{<ExpensesList expenses={currentExpenses} />}</ul>
      </div>
      <div>
        <Pagination
          transactionsPerPage={transactionsPerPage}
          totalTransactions={expenses.length}
          paginate={paginate}
        />
      </div>
    </Fragment>
  );
};

export default Expense;
