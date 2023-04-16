import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import Logo from "../assets/logo.png";
const SignUp = () => {
  const navigate = useNavigate();
  const signUpHandler = () => {
    navigate("/dashboard");
  };
  return (
    <Fragment>
      <div className={classes.hero}>
        <div className={classes.card}>
          <img src={Logo} alt="company logo" className={classes.logo} />
          <form onSubmit={signUpHandler}>
            <div>
              <label htmlFor="firstname">Firstname</label>
              <input type="text" id="firstname" placeholder="Sam"></input>
            </div>
            <div>
              <label htmlFor="lastName">LastName</label>
              <input type="text" id="lastName" placeholder="Smith"></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="sg@example.com"
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"></input>
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
