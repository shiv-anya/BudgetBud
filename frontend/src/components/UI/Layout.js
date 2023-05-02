import React, { Fragment, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../Context/AuthContext";

const Layout = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      {ctx.isLoggedIn && <Header />}
      {props.children}
      {ctx.isLoggedIn && <Footer />}
    </Fragment>
  );
};

export default Layout;
