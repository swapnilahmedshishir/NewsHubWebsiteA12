import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaNewspaper,
  FaUserPlus,
  FaHome,
} from "react-icons/fa"; // React Icons
import useAdmin from "../../Hook/useAdmin";

const Dashboard = () => {
  const [admin] = useAdmin();
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-r from-indigo-600 to-indigo-800 p-4">
        <ul className="menu space-y-4 text-white">
          <li>
            <NavLink
              to="/dashboard/maindashboard"
              className="flex items-center p-2 rounded-md hover:bg-indigo-700"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="all-users"
              className="flex items-center p-2 rounded-md hover:bg-indigo-700"
            >
              <FaUsers className="mr-2" /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="all-articles"
              className="flex items-center p-2 rounded-md hover:bg-indigo-700"
            >
              <FaNewspaper className="mr-2" /> All Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-publisher"
              className="flex items-center p-2 rounded-md hover:bg-indigo-700"
            >
              <FaUserPlus className="mr-2" /> Add Publisher
            </NavLink>
          </li>
        </ul>
        <div className="divider divider-neutral"></div>
        <ul className="menu space-y-4 text-white">
          <li>
            <NavLink
              to="/"
              className="flex items-center p-2 rounded-md hover:bg-indigo-700"
            >
              <FaHome className="mr-2" />
              Website
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
