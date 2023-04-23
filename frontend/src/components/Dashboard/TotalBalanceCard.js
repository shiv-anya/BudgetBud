import React from "react";
import classes from "./TotalBalanceCard.module.css";
const TotalBalanceCard = (props) => {
  return (
    <div className={classes.card}>
      <h3>Total Balance</h3>
      <h2>${props.totalBalance}</h2>
    </div>
  );
};

export default TotalBalanceCard;
