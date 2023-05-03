const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
require("dotenv").config();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Controll-Allow-Methods",
      "PUT, PUSH, PATCH, GET, DELETE"
    );
    res.status(200).json({});
  }
  next();
});
app.use(authRoutes);
app.use(usersRoutes);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("here");
    app.listen(process.env.port, "0.0.0.0");
  })
  .catch((err) => {
    console.log(err);
  });
