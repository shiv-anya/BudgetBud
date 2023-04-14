import React from "react";
import classes from "./IncomeExpenseCard.module.css";
const IncomeExpenseCard = (props) => {
  return (
    <div className={classes.card} style={props.style}>
      <div className={classes.icon}>
        <i>+</i>
      </div>
      <div className={classes.data}>
        <h3>Total {props.type}</h3>
        <h2>$25666.6</h2>
      </div>
    </div>
  );
};

export default IncomeExpenseCard;
