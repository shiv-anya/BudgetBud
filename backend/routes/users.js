const express = require("express");

const usersController = require("../controllers/users");
// const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/:userId/transactions", usersController.getTransactions);

router.get("/:userId/incomes", usersController.getIncomes);

router.get("/:userId/expenses", usersController.getExpenses);

router.get(
  "/:userId/update/:transactionId",
  usersController.getInfoOfToBeUpdatedTransaction
);

router.get(
  "/chart/:userId/vertical-bar",
  usersController.getTransactionsYearly
);
router.get("/chart/:userId/pie", usersController.getCategoryWise);

router.post("/:userId/add-transaction", usersController.addTransaction);

router.patch(
  "/:userId/transactions/:transactionId",
  usersController.updateTransaction
);

router.delete(
  "/:userId/delete/:transactionId",
  usersController.deleteTransaction
);

module.exports = router;
