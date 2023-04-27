const express = require("express");

const usersController = require("../controllers/users");
// const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/transactions", usersController.getTransactions);

router.get("/incomes", usersController.getIncomes);

router.get("/expenses", usersController.getExpenses);

router.get(
  "/update/:transactionId",
  usersController.getInfoOfToBeUpdatedTransaction
);

router.get("/chart/vertical-bar", usersController.getTransactionsYearly);
router.get("/chart/pie", usersController.getCategoryWise);

router.post("/add-transaction", usersController.addTransaction);

router.patch("/transactions/:transactionId", usersController.updateTransaction);

router.delete("/delete/:transactionId", usersController.deleteTransaction);
// router.patch("/edit-user/:userId", isAuth, adminController.updateUser);

// router.delete("/delete-user/:userId", isAuth, adminController.deleteUser);

//Roles routes if user is user only
// router.get("/roles", isAuth, adminController.readRoles);

// router.get("/roles/:roleId", isAuth, adminController.getSingleRole);

//Roles routes for admin
// router.post("/add-role", isAuth, adminController.createRole);

// router.delete(
//   "/roles/:roleId/:userId",
//   isAuth,
//   adminController.deleteUserFromRole
// );

// router.patch("/roles/:roleId", isAuth, adminController.addUserToRole);

// router.delete("/delete-role/:roleId", isAuth, adminController.deleteRole);

module.exports = router;
