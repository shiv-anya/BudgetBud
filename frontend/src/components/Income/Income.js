import React, { Fragment, useContext, useEffect, useState } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import classes from "./Income.module.css";
import axios from "axios";
import IncomesList from "./IncomesList";
import Pagination from "../UI/Pagination/Pagination";
import AuthContext from "../Context/AuthContext";

const Income = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ctx = useContext(AuthContext);
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentIncomes = incomes.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/${ctx.userId}/incomes`)
      .then((res) => {
        setIncomes(res.data.incomes);
        setTotalIncome(res.data.totalIncome);
      });
  }, [totalIncome, ctx.userId]);
  return (
    <Fragment>
      <div className={classes.container}>
        <IncomeExpenseCard
          type="Income"
          className={classes.center}
          amount={totalIncome}
        />
        <ul>{<IncomesList incomes={currentIncomes} />}</ul>
        <div>
          <Pagination
            transactionsPerPage={transactionsPerPage}
            totalTransactions={incomes.length}
            paginate={paginate}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Income;
