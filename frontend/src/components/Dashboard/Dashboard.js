import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import TotalBalanceCard from "./TotalBalanceCard";
import IncomeExpenseCard from "./IncomeExpenseCard";
import axios from "axios";
import TransactionsList from "./TransactionsList";
import Pagination from "../UI/Pagination/Pagination";
import AuthContext from "../Context/AuthContext";
const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ctx = useContext(AuthContext);
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/${ctx.userId}/transactions`)
      .then((res) => {
        setTotalBalance(res.data.totalBalance);
        setTotalExpense(res.data.totalExpense);
        setTotalIncome(res.data.totalIncome);
        setTransactions(res.data.transactions);
      });
  }, [totalBalance, ctx.userId]);
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
          <TransactionsList transactions={currentTransactions} />
        </div>
        <div>
          <Pagination
            transactionsPerPage={transactionsPerPage}
            totalTransactions={transactions.length}
            paginate={paginate}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
