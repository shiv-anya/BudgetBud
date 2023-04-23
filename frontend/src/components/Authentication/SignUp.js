import React, { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import Logo from "../assets/logo.png";
import axios from "axios";
const SignUp = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => navigate("/dashboard"))
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Fragment>
      <div className={classes.hero}>
        <div className={classes.card}>
          <img src={Logo} alt="company logo" className={classes.logo} />
          <form onSubmit={signUpHandler}>
            <div>
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                placeholder="Sam"
                ref={firstNameRef}
              ></input>
            </div>
            <div>
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                id="lastName"
                placeholder="Smith"
                ref={lastNameRef}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="sg@example.com"
                ref={emailRef}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={passwordRef}></input>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
