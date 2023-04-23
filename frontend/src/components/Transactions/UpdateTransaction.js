import React, { Fragment } from "react";
import AddTransactionForm from "./AddTransactionForm";
import classes from "./UpdateTransaction.module.css";
import UpdateTransactionForm from "./UpdateTransactionForm";

const UpdateTransaction = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <UpdateTransactionForm />
      </div>
    </Fragment>
  );
};

export default UpdateTransaction;
