import React, { Fragment, useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import TotalBalanceCard from "./TotalBalanceCard";
import IncomeExpenseCard from "./IncomeExpenseCard";
import axios from "axios";
import TransactionsList from "./TransactionsList";
const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/transactions").then((res) => {
      setTotalBalance(res.data.totalBalance);
      setTotalExpense(res.data.totalExpense);
      setTotalIncome(res.data.totalIncome);
      setTransactions(res.data.transactions);
    });
  }, [totalBalance]);
  return (
    <Fragment>
      <div className={classes.container}>
        <TotalBalanceCard totalBalance={totalBalance} />
        <div className={classes.income_expense}>
          <IncomeExpenseCard type="Income" amount={totalIncome} />
          <IncomeExpenseCard
            type="Expense"
            amount={totalExpense}
            style={{ marginLeft: 40 + "px" }}
          />
        </div>
        <div className={classes.transactions}>
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
