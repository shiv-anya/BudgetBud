import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import classes from "./Chart.module.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Transactions in year",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const VerticalChart = () => {
  const yearRef = useRef();
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((t, index) => Math.random() * 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: labels.map((t, index) => Math.random() * 0),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/chart/${
          ctx.userId
        }/vertical-bar?year=${new Date().getFullYear()}`
      )
      .then((res) => {
        const income = [];
        const expense = [];
        res.data.transactions.forEach((t, index) => {
          income.push(t[0]);
        });
        res.data.transactions.forEach((t, index) => {
          expense.push(t[1]);
        });
        setData({
          labels,
          datasets: [
            {
              label: "Income",
              data: labels.map((t, index) => income[index]),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Expense",
              data: labels.map((t, index) => expense[index]),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      });
  }, [ctx.userId]);
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:8000/chart/${ctx.userId}/vertical-bar?year=${yearRef.current.value}`
      )
      .then((res) => {
        const income = [];
        const expense = [];
        res.data.transactions.forEach((t, index) => {
          income.push(t[0]);
        });
        res.data.transactions.forEach((t, index) => {
          expense.push(t[1]);
        });
        setData({
          labels,
          datasets: [
            {
              label: "Income",
              data: labels.map((t, index) => income[index]),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Expense",
              data: labels.map((t, index) => expense[index]),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      });
  };
  return (
    <div className={classes.bar}>
      <div>
        <form onSubmit={submitHandler}>
          <select name="year" id="year" ref={yearRef}>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalChart;
