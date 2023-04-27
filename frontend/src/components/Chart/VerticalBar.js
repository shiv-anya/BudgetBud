import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((t, index) => Math.random() * 1000),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: labels.map((t, index) => Math.random() * 1000),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  useEffect(() => {
    axios.get("http://localhost:8000/chart/vertical-bar").then((res) => {
      const income = [];
      const expense = [];
      res.data.forEach((t) => {
        income.push(t[0]);
      });
      res.data.forEach((t) => {
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
            data: labels.map((t, index) => income[index]),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    });
  }, []);
  return (
    <div className={classes.bar}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalChart;
