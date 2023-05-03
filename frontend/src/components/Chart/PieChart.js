import React, { useContext, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import classes from "./Chart.module.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const yearRef = useRef();
  const monthRef = useRef();
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({
    labels: [
      "Entertainment",
      "Food",
      "Clothing",
      "Transportation",
      "Bills",
      "Health",
      "Others",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(144, 238, 144, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(144, 238, 144, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_BASE_URL}/chart/${
          ctx.userId
        }pie?year${new Date().getFullYear()}&month=${new Date().getMonth()}`
      )
      .then((res) => {
        setData({
          labels: [
            "Entertainment",
            "Food",
            "Clothing",
            "Transportation",
            "Bills",
            "Health",
            "Others",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: res.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(144, 238, 144, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(144, 238, 144, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  }, [ctx.userId]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_BASE_URL}/chart/${ctx.userId}/pie?year=${yearRef.current.value}&month=${monthRef.current.value}`
      )
      .then((res) => {
        setData({
          labels: [
            "Entertainment",
            "Food",
            "Clothing",
            "Transportation",
            "Bills",
            "Health",
            "Others",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: res.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(144, 238, 144, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(144, 238, 144, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  };
  return (
    <div className={classes.pie}>
      <div>
        <form onSubmit={submitHandler}>
          <select name="year" id="year" ref={yearRef}>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
          <select name="month" id="month" ref={monthRef}>
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Category wise expense",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
