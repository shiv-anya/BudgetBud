import { React, Fragment } from "react";
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

function App() {
  return (
    <Fragment>
      <AlertProvider>
        <AlertPopup />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/update/:transactionId"
            element={<UpdateTransaction />}
          />
        </Routes>
      </AlertProvider>
    </Fragment>
  );
}

export default App;
