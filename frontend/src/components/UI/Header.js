import React from "react";
import classes from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <nav className={classes.navbar}>
        <Link to="/dashboard">
          <div className={classes.logo}></div>
        </Link>
        <ul>
          <li>
            <NavLink to="/dashboard" className={classes.active}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/income" className={classes.active}>
              Income
            </NavLink>
          </li>
          <li>
            <NavLink to="/expense" className={classes.active}>
              Expense
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-transaction" className={classes.active}>
              Add Transaction
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.active}>Chart</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={classes.active}>
              About
            </NavLink>
          </li>
        </ul>
        <div className={classes.theme}>
          <FaSun />
          {/* <FaMoon /> */}
        </div>
      </nav>
      <div className={classes.border}></div>
    </header>
  );
};

export default Header;
