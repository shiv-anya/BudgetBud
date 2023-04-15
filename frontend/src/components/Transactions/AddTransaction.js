import React, { Fragment } from "react";
import AddTransactionForm from "./AddTransactionForm";
import classes from "./AddTransaction.module.css";

const AddTransaction = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <AddTransactionForm />
      </div>
    </Fragment>
  );
};

export default AddTransaction;
