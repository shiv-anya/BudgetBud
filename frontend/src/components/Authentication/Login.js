import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../assets/logo.png";
const Login = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/dashboard");
  };
  return (
    <Fragment>
      <div className={classes.hero}>
        <div className={classes.card}>
          <img src={Logo} alt="company logo" className={classes.logo} />
          <form onSubmit={loginHandler}>
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
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
