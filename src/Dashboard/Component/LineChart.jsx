import React from "react";
import { Chart } from "react-google-charts";

const LineChart = () => {
  const data = [
    ["Month", "Revenue"],
    ["Jan", 1000],
    ["Feb", 1500],
    ["Mar", 1800],
    ["Apr", 2000],
  ];

  const options = {
    title: "Monthly Revenue",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};

export default LineChart;
