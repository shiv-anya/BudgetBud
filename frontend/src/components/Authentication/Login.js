import React, { Fragment, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../assets/logo.png";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_BASE_URL}/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        const user = res.data;
        ctx.signup(user.userId, user.userToken);
        navigate("/dashboard");
      });
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
                ref={emailRef}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={passwordRef}></input>
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
