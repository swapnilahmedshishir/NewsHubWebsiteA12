import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-orange-500 p-4">
        <ul className="menu space-y-4 text-white">
          <li>
            <NavLink
              to="/admin/dashboard"
              className="block p-2 rounded-md hover:bg-orange-600"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className="block p-2 rounded-md hover:bg-orange-600"
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/articles"
              className="block p-2 rounded-md hover:bg-orange-600"
            >
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-publisher"
              className="block p-2 rounded-md hover:bg-orange-600"
            >
              Add Publisher
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
