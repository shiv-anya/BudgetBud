import React from "react";
import classes from "./IncomeExpenseCard.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const IncomeExpenseCard = (props) => {
  return (
    <div className={classes.card} style={props.style}>
      <div className={classes.icon}>
        {props.type === "Expense" && <FaArrowDown color="rgb(243, 108, 108)" />}
        {props.type === "Income" && <FaArrowUp color="rgb(0,119,255)" />}
      </div>
      <div className={classes.data}>
        <h3>Total {props.type}</h3>
        <h2>${props.amount}</h2>
      </div>
    </div>
  );
};

export default IncomeExpenseCard;
