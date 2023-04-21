const User = require("../models/users");
const ObjectId = require("mongodb").ObjectId;

exports.getTransactions = (req, res, next) => {
  User.find({ _id: new ObjectId("6442a112e3a02c5945f55a1c") })
    .then((user) => {
      res.json({
        transactions: user[0].transactions,
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
};

exports.getIncomes = (req, res, next) => {
  User.find({ _id: new ObjectId("6442a112e3a02c5945f55a1c") })
    .then((user) => {
      const incomes = user[0].transactions.filter(
        (transaction) => transaction.type === "income"
      );
      res.json({
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
  User.find({ _id: new ObjectId("6442a112e3a02c5945f55a1c") })
    .then((user) => {
      const expenses = user[0].transactions.filter(
        (transaction) => transaction.type === "expense"
      );
      res.json({
        expenses: expenses,
      });
    })
    .catch((err) => {
      res.json({
        message: "Can't fetch expenses.",
      });
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
  User.find({ _id: new ObjectId("6442b96f9913346364b4d613") })
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
  User.find({ _id: new ObjectId("6442b96f9913346364b4d613") })
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
  const title = req.body.title;
  const amount = parseInt(req.body.amount);
  const type = req.body.type;
  const tag = req.body.tag;
  const date = req.body.date;
  const note = req.body.note;
  const oldTransactionId = new ObjectId(req.params.transactionId);
  User.find({ _id: new ObjectId("6442b96f9913346364b4d613") })
    .then((user) => {
      const updatedTransaction = {
        title,
        amount,
        type,
        tag,
        date,
        note,
        _id: oldTransactionId,
      };
      const otherTransactions = user[0].transactions.filter(
        (u) => u._id.toString() !== oldTransactionId.toString()
      );
      otherTransactions.push(updatedTransaction);
      user[0].transactions = otherTransactions;
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
  User.find({ _id: new ObjectId("6442b96f9913346364b4d613") })
    .then((user) => {
      const newTransactions = user[0].transactions.filter(
        (u) => u._id.toString() !== IdToBeDeleted.toString()
      );
      user[0].transactions = newTransactions;
      user[0].save().then(() => res.json({ message: "Successfully deleted!" }));
    })
    .catch((err) => res.json({ message: "Deletion failed!" }));
};
