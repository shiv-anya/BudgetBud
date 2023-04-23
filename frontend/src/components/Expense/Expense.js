import React, { Fragment, useEffect, useState } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import TransactionCard from "../Transactions/TransactionCard";
import classes from "./Expense.module.css";
import axios from "axios";
import ExpensesList from "./ExpenseList";

const Expense = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
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
        <ul>{<ExpensesList expenses={expenses} />}</ul>
      </div>
    </Fragment>
  );
};

export default Expense;
