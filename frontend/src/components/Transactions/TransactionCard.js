import React from "react";
import classes from "./TransactionCard.module.css";

const TransactionCard = () => {
  return (
    <div className={classes.card}>
      <div className={classes.icon}></div>
      <div className={classes.info}>
        <div className={classes.title}>
          <h3>Title</h3>
          <p>Entertainment</p>
        </div>
        <div className={classes.price}>
          <h3>$16.66</h3>
          <p>14 Feb 2023</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
