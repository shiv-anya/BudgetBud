const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;
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
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
});
