import React, { Fragment } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import TransactionCard from "../Transactions/TransactionCard";
import classes from "./Expense.module.css";

const Expense = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <IncomeExpenseCard type={"Expense"} />
        <TransactionCard />
      </div>
    </Fragment>
  );
};

export default Expense;
