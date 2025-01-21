import React from "react";
import { Chart } from "react-google-charts";

const PieChart = () => {
  const data = [
    ["Publisher", "Articles"],
    ["Publication A", 2],
    ["Publication B", 3],
    ["Publication C", 5],
  ];

  const options = {
    title: "Publication Article Distribution",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};

export default PieChart;
