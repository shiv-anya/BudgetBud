import React from "react";
import classes from "./AddTransactionForm.module.css";
const AddTransactionForm = () => {
  return (
    <form className={classes.card}>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Income Tax" />
        </div>
        <div className={classes.inner}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0"
            min="0"
          />
        </div>
      </div>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <label htmlFor="transaction_type">Transaction Type</label>
          <select id="transcation_type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className={classes.inner}>
          <label htmlFor="tags">Tags</label>
          <select id="tags">
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="transportation">Transportation</option>
            <option value="bills">Bills</option>
            <option value="health">Health</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className={classes.inner}>
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            name="note"
            placeholder="Paid Income Tax"
          />
        </div>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
