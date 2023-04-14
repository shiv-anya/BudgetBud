import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className={classes.navbar}>
        <ul>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink>Income</NavLink>
          </li>
          <li>
            <NavLink>Expense</NavLink>
          </li>
          <li>
            <NavLink>Add Transaction</NavLink>
          </li>
          <li>
            <NavLink>Chart</NavLink>
          </li>
          <li>
            <NavLink>About</NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.border}></div>
    </header>
  );
};

export default Header;
