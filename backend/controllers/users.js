const User = require("../models/users");
const ObjectId = require("mongodb").ObjectId;

exports.getTransactions = (req, res, next) => {
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      res.json({
        transactions: user[0].transactions,
        totalBalance: user[0].totalBalance,
        totalExpense: user[0].totalExpense,
        totalIncome: user[0].totalIncome,
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
};

exports.getIncomes = (req, res, next) => {
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      const incomes = user[0].transactions.filter(
        (transaction) => transaction.type === "income"
      );
      res.json({
        totalIncome: user[0].totalIncome,
        incomes: incomes,
      });
    })
    .catch((err) => {
      res.json({
        message: "Can't fetch incomes.",
      });
    });
};

exports.getExpenses = (req, res, next) => {
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      const expenses = user[0].transactions.filter(
        (transaction) => transaction.type === "expense"
      );
      res.json({
        totalExpense: user[0].totalExpense,
        expenses: expenses,
      });
    })
    .catch((err) => {
      res.json({
        message: "Can't fetch expenses.",
      });
    });
};

exports.getTransactionsYearly = (req, res, next) => {
  const transactionsMonthWise = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") }).then((user) => {
    for (let i = 0; i < 12; i++) {
      const monthArray = [];
      user[0].transactions.forEach((t, index) => {
        if (new Date(t.date).getMonth() === i) {
          if (t.type === "income") {
            transactionsMonthWise[i][0] += t.amount;
          } else {
            transactionsMonthWise[i][1] += t.amount;
          }
        }
      });
    }
    res.json(transactionsMonthWise);
  });
};

exports.getCategoryWise = (req, res, next) => {
  const categoryWise = [0, 0, 0, 0, 0, 0, 0];
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") }).then((user) => {
    user[0].transactions.forEach((t) => {
      if (t.tag === "entertainment") categoryWise[0] += t.amount;
      if (t.tag === "food") categoryWise[1] += t.amount;
      if (t.tag === "clothing") categoryWise[2] += t.amount;
      if (t.tag === "transportation") categoryWise[3] += t.amount;
      if (t.tag === "bills") categoryWise[4] += t.amount;
      if (t.tag === "health") categoryWise[5] += t.amount;
      if (t.tag === "others") categoryWise[6] += t.amount;
    });
    res.json(categoryWise);
  });
};

exports.addTransaction = (req, res, next) => {
  const title = req.body.title;
  const amount = parseInt(req.body.amount);
  const type = req.body.type;
  const tag = req.body.tag;
  const date = req.body.date;
  const note = req.body.note;
  const newTransaction = {
    title,
    amount,
    type,
    tag,
    date,
    note,
    _id: new ObjectId(),
  };
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      if (type === "expense") {
        if (user[0].totalBalance - amount < 0) {
          throw "Not enough balance!";
        } else {
          const transactions = user[0].transactions;
          transactions.push(newTransaction);
          user[0].transactions = transactions;
          user[0].totalBalance -= amount;
          user[0].totalExpense += amount;

          user[0]
            .save()
            .then(() => res.json({ message: "New Transaction added." }))
            .catch((err) => {
              res.json({ message: "Not able to add Income." });
            });
        }
      } else if (type === "income") {
        const transactions = user[0].transactions;
        transactions.push(newTransaction);
        user[0].transactions = transactions;
        user[0].totalBalance += amount;
        user[0].totalIncome += amount;

        user[0]
          .save()
          .then(() => res.json({ message: "New Transaction added." }))
          .catch((err) => {
            res.json({ message: "Not able to add Income." });
          });
      }
    })
    .catch((err) => {
      res.json({
        message: "Can't add transaction.",
      });
    });
};
exports.getInfoOfToBeUpdatedTransaction = (req, res, next) => {
  const IdToBeUpdated = new ObjectId(req.params.transactionId);
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      const toBeUpdatedTransaction = user[0].transactions.find(
        (u) => u._id.toString() === IdToBeUpdated.toString()
      );
      res.json({
        toBeUpdatedTransaction,
      });
    })
    .catch((err) =>
      res.json({ message: "Failed to retrieve transaction info." + err })
    );
};
exports.updateTransaction = (req, res, next) => {
  console.log("was");
  const title = req.body.title;
  const amount = parseInt(req.body.amount);
  const type = req.body.type;
  const tag = req.body.tag;
  const date = req.body.date;
  const note = req.body.note;
  const id = new ObjectId(req.body.id);
  console.log(id);
  // const oldTransactionId = new ObjectId(req.params.transactionId);
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      const toBeUpdatedTransaction = user[0].transactions.find(
        (t) => t._id.toString() === id.toString(0)
      );
      console.log(toBeUpdatedTransaction);
      let balance = user[0].totalBalance;
      let expense = user[0].totalExpense;
      let income = user[0].totalIncome;
      if (type === toBeUpdatedTransaction.type) {
        if (type === "expense") {
          balance += toBeUpdatedTransaction.amount;
          expense -= toBeUpdatedTransaction.amount;
          balance -= amount;
          expense += amount;
        } else {
          balance -= toBeUpdatedTransaction.amount;
          income -= toBeUpdatedTransaction.amount;
          balance += amount;
          income += amount;
          if (balance < 0) {
            res.json({ message: "Balance can't go negative" });
            return;
          }
        }
      } else {
        if (type === "expense") {
          income -= amount;
          balance -= amount;
          if (balance < 0) {
            res.json({ message: "Balance can't go negative" });
            return;
          }
          expense += amount;
        } else {
          balance += amount;
          expense -= amount;
          balance += amount;
          income += amount;
        }
      }
      const updatedTransaction = {
        title,
        amount,
        type,
        tag,
        date,
        note,
        _id: id,
      };
      const otherTransactions = user[0].transactions.filter(
        (u) => u._id.toString() !== id.toString()
      );
      otherTransactions.push(updatedTransaction);
      user[0].transactions = otherTransactions;
      user[0].totalBalance = balance;
      user[0].totalExpense = expense;
      user[0].totalIncome = income;
      console.log(balance + " " + income + " " + expense);
      user[0]
        .save()
        .then(() => res.json({ message: "Successfully updated transaction!" }));
    })
    .catch((err) => {
      res.json("Can't update transaction" + err);
    });
};

exports.deleteTransaction = (req, res, next) => {
  const IdToBeDeleted = new ObjectId(req.params.transactionId);
  User.find({ _id: new ObjectId("6443f33838c307efafff4b4d") })
    .then((user) => {
      const oldTransaction = user[0].transactions.find(
        (u) => u._id.toString() === IdToBeDeleted.toString()
      );
      if (oldTransaction.type === "expense") {
        user[0].totalBalance += oldTransaction.amount;
        user[0].totalExpense -= oldTransaction.amount;
      } else {
        if (user[0].totalBalance - oldTransaction.amount < 0) {
          res.json({ message: "Balance can't go negative." });
          return;
        }
        user[0].totalBalance -= oldTransaction.amount;
        user[0].totalIncome -= oldTransaction.amount;
      }
      const newTransactions = user[0].transactions.filter(
        (u) => u._id.toString() !== IdToBeDeleted.toString()
      );
      user[0].transactions = newTransactions;
      user[0].save().then(() => res.json({ message: "Successfully deleted!" }));
    })
    .catch((err) => res.json({ message: "Deletion failed!" }));
};
