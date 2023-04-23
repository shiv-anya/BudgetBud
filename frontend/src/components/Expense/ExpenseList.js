import React from "react";
import TransactionCard from "../Transactions/TransactionCard";

const ExpensesList = (props) => {
  // props.expenses.map((e) => {
  //   console.log(e._id);
  // });
  const expenses = props.expenses.map((e) => (
    <li key={e._id.toString()}>
      <TransactionCard
        key={e._id.toString()}
        title={e.title}
        amount={e.amount}
        tag={e.tag}
        date={e.date}
        type={e.type}
        id={e._id}
      />
    </li>
  ));
  return (
    <div>
      <ul>{expenses}</ul>
    </div>
  );
};

export default ExpensesList;
