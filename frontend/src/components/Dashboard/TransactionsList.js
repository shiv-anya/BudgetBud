import React from "react";
import TransactionCard from "../Transactions/TransactionCard";

const TransactionsList = (props) => {
  const transactions = props.transactions.map((t) => (
    <li key={t._id}>
      <TransactionCard
        key={t._id}
        title={t.title}
        amount={t.amount}
        tag={t.tag}
        date={t.date}
        type={t.type}
        id={t._id}
      />
    </li>
  ));
  return (
    <div>
      <ul>{transactions}</ul>
    </div>
  );
};

export default TransactionsList;
