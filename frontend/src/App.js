import { React, Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Authentication/Login";
import AddTransaction from "./components/Transactions/AddTransaction";
import Income from "./components/Income/Income";
import Expense from "./components/Expense/Expense";
import About from "./components/About/About";
import SignUp from "./components/Authentication/SignUp";
import UpdateTransaction from "./components/Transactions/UpdateTransaction";
import { AlertProvider } from "./components/Context/AlertContext";
import AlertPopup from "./components/UI/AlertPopup";
import Chart from "./components/Chart/Chart";
import AuthContext from "./components/Context/AuthContext";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      <AlertProvider>
        <AlertPopup />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {ctx.isLoggedIn && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {ctx.isLoggedIn && (
            <Route path="/add-transaction" element={<AddTransaction />} />
          )}
          {ctx.isLoggedIn && <Route path="/income" element={<Income />} />}
          {ctx.isLoggedIn && <Route path="/expense" element={<Expense />} />}
          {ctx.isLoggedIn && <Route path="/about" element={<About />} />}
          {ctx.isLoggedIn && <Route path="/chart" element={<Chart />} />}
          {ctx.isLoggedIn && (
            <Route
              path="/update/:transactionId"
              element={<UpdateTransaction />}
            />
          )}
        </Routes>
      </AlertProvider>
    </Fragment>
  );
}

export default App;
