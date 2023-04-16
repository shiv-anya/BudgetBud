import React, { Fragment } from "react";
import classes from "./About.module.css";
const About = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <h2>About</h2>
          <p>
            This is version 1.0. I have created BudgetBud so you have a buddy to
            whom you can share your transactions details securely. I aim to give
            a user friendly UI experience.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
