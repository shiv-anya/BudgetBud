const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalBalance: { type: Number, default: 0 },
  totalIncome: { type: Number, default: 0 },
  totalExpense: { type: Number, default: 0 },
  transactions: {
    expense: { type: Array },
    income: { type: Array },
  },
});

module.exports = mongoose.model("Users", usersSchema);
