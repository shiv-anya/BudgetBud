import React, { Fragment } from "react";
import VerticalChart from "./VerticalBar";
import PieChart from "./PieChart";

const Chart = () => {
  return (
    <Fragment>
      <div className="container">
        <VerticalChart />
        <PieChart />
      </div>
    </Fragment>
  );
};

export default Chart;
