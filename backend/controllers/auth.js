const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
require("dotenv").config();

// const login = (req, res, email, password) => {
//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         return res.json({
//           message: "Email doesn't exist",
//         });
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then((match) => {
//           if (!match) {
//             return res.redirect("/login");
//           }
//           const token = jwt.sign({ email }, process.env.JSONWEB_SECRET, {
//             expiresIn: "2h",
//           });
//           user.token = token;
//           user.save().then((data) => {
//             req.session.user = data;
//             req.session.save((err) => {
//               console.log(err);
//               res.json({
//                 message: "logged in",
//                 user: user,
//               });
//             });
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// };

// exports.postLogin = async (req, res, next) => {
//   const email = req.body.email.toLowerCase();
//   const password = req.body.password;
//   const mainUser = await User.findOne({ email: email });
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       user.reload().then(() => {
//         if (!user.emailVerified) {
//           console.log("not verified");
//           return res.json({
//             message: "Not verified",
//           });
//         } else {
//           mainUser.isVerified = true;
//           mainUser.save().then(() => {
//             login(req, res, email, password);
//           });
//         }
//       });
//     } else if (mainUser.isVerified) {
//       login(req, res, email, password);
//     }
//   });
// };

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({
        message: "Email already exist.",
      });
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
        console.log(result);
        res.json({
          message: "User created",
        });
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
