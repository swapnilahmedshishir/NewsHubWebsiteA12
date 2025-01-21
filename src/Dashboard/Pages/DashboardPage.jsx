import React from "react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">
            Articles by Publication
          </h2>
          <PieChart />
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">User Engagement</h2>
          <BarChart />
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
