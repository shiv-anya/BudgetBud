import React, { Fragment, useEffect, useState } from "react";
import IncomeExpenseCard from "../Dashboard/IncomeExpenseCard";
import TransactionCard from "../Transactions/TransactionCard";
import classes from "./Income.module.css";
import axios from "axios";
import IncomesList from "./IncomesList";

const Income = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/incomes").then((res) => {
      setIncomes(res.data.incomes);
      setTotalIncome(res.data.totalIncome);
    });
  }, [totalIncome]);
  return (
    <Fragment>
      <div className={classes.container}>
        <IncomeExpenseCard
          type="Income"
          className={classes.center}
          amount={totalIncome}
        />
        <ul>{<IncomesList incomes={incomes} />}</ul>
      </div>
    </Fragment>
  );
};

export default Income;
