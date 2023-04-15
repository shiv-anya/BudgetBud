import React, { Fragment } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import TransactionCard from "../Transactions/TransactionCard";
import classes from "./Income.module.css";

const Income = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <IncomeExpenseCard type="Income" />
        <TransactionCard />
      </div>
    </Fragment>
  );
};

export default Income;
