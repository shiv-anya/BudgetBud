const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
require("dotenv").config();

exports.postLogin = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const userToken = jwt.sign({ id: user._id }, process.env.SECRET);
  res.json({ userId: user._id, userToken, message: "Successfully Logged In" });
};

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.json({
        message: "Email already exist.",
      });
      return;
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword,
          email: email,
        });
        return user.save();
      })
      .then((result) => {
        const userToken = jwt.sign(
          { id: result._id.toString() },
          process.env.SECRET
        );
        res.json({ userToken, userId: result._id, message: "User created." });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  });
};

// exports.postLogout = async (req, res, next) => {
//   const user = await User.findOne({ email: req.user.email });
//   user.token = "";
//   user.save().then(() => {
//     req.session.destroy((err) => {
//       res.json({
//         message: "logged out",
//       });
//     });
//   });
// };
