import React from "react";
import { Chart } from "react-google-charts";

const BarChart = () => {
  const data = [
    ["Month", "Users"],
    ["Jan", 100],
    ["Feb", 200],
    ["Mar", 150],
    ["Apr", 250],
  ];

  const options = {
    title: "User Engagement by Month",
    hAxis: { title: "Month" },
    vAxis: { title: "Users" },
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};

export default BarChart;
