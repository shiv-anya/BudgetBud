import React, { Fragment } from "react";
import classes from "./Dashboard.module.css";
import TotalBalanceCard from "./TotalBalanceCard";
import IncomeExpenseCard from "./IncomeExpenseCard";
import TransactionCard from "../Transactions/TransactionCard";
const Dashboard = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <TotalBalanceCard />
        <div className={classes.income_expense}>
          <IncomeExpenseCard type="Income" />
          <IncomeExpenseCard type="Expense" style={{ marginLeft: 40 + "px" }} />
        </div>
        <div className={classes.transactions}>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
