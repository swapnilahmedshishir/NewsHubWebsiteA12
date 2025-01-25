import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../Context/ContextProvider";
import { toast } from "react-toastify";
import useAdmin from "../../Hook/useAdmin";
import useLoginUserInfo from "../../Hook/useLoginUserInfo";

const Navbar = () => {
  const { user, logoutUser, isLoading } = useContext(AppContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [data, isUserLoading, refetch] = useLoginUserInfo();

  // Automatically refetch when certain conditions change
  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [refetch]);

  // Function to check if a user is premium
  const isPremiumUser =
    data?.premiumTaken && new Date(data.premiumTaken) > new Date();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch(() => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  return (
    <nav className="navbar bg-base-100 shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-articles" activeClassName="active">
                Add Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-articles" activeClassName="active">
                All Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/subscription" activeClassName="active">
                Subscription
              </NavLink>
            </li>
            {!isAdminLoading && isAdmin && (
              <li>
                <NavLink to="/dashboard/maindashboard" activeClassName="active">
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/my-articles" activeClassName="active">
                My Articles
              </NavLink>
            </li>
            {!isUserLoading && isPremiumUser && (
              <li>
                <NavLink to="/premium-articles" activeClassName="active">
                  Premium Articles
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          NewsHub
        </NavLink>
      </div>

      {/* Navbar Center for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-articles" activeClassName="active">
              Add Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-articles" activeClassName="active">
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/subscription" activeClassName="active">
              Subscription
            </NavLink>
          </li>
          {!isAdminLoading && isAdmin && (
            <li>
              <NavLink to="/dashboard/maindashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/my-articles" activeClassName="active">
              My Articles
            </NavLink>
          </li>
          {!isUserLoading && isPremiumUser && (
            <li>
              <NavLink to="/premium-articles" activeClassName="active">
                Premium Articles
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <NavLink to="/profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full border-2 border-gray-300"
                referrerPolicy="no-referrer"
              />
            </NavLink>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
