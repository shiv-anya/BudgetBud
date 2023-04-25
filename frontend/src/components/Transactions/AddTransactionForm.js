import React, { useRef } from "react";
import classes from "./AddTransactionForm.module.css";
import axios from "axios";
import useAlert from "../Context/customhooks/useAlert";
const AddTransactionForm = () => {
  const { setAlert } = useAlert();
  const titleRef = useRef();
  const amountRef = useRef();
  const typeRef = useRef();
  const tagRef = useRef();
  const dateRef = useRef();
  const noteRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/add-transaction", {
        title: titleRef.current.value,
        amount: amountRef.current.value,
        type: typeRef.current.value,
        tag: tagRef.current.value,
        date: new Date(dateRef.current.value),
        note: noteRef.current.value,
      })
      .then((res) => {
        titleRef.current.value = "";
        amountRef.current.value = 0;
        typeRef.current.value = "";
        tagRef.current.value = "";
        dateRef.current.value = new Date().toDateString();
        noteRef.current.value = "";
        setAlert(res.data.message, "success");
      });
  };
  return (
    <form className={classes.card} onSubmit={submitHandler}>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Income Tax"
            ref={titleRef}
          />
        </div>
        <div className={classes.inner}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0"
            min="0"
            ref={amountRef}
          />
        </div>
      </div>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <label htmlFor="transaction_type">Transaction Type</label>
          <select id="transcation_type" ref={typeRef}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className={classes.inner}>
          <label htmlFor="tags">Tags</label>
          <select id="tags" ref={tagRef}>
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
          <input type="date" id="date" name="date" ref={dateRef} />
        </div>
        <div className={classes.inner}>
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            name="note"
            placeholder="Paid Income Tax"
            ref={noteRef}
          />
        </div>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
