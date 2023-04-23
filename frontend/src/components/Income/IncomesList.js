import React from "react";
import TransactionCard from "../Transactions/TransactionCard";

const IncomesList = (props) => {
  const transactions = props.incomes.map((i) => (
    <li key={i._id}>
      <TransactionCard
        key={i._id}
        title={i.title}
        amount={i.amount}
        tag={i.tag}
        date={i.date}
        type={i.type}
        id={i._id}
      />
    </li>
  ));
  return (
    <div>
      <ul>{transactions}</ul>
    </div>
  );
};

export default IncomesList;
