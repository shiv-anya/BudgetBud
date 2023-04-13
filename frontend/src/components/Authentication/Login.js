import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/dashboard");
  };
  return (
    <Fragment>
      <div className={classes.hero}>
        <div className={classes.card}>
          <form onSubmit={loginHandler}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email"></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
