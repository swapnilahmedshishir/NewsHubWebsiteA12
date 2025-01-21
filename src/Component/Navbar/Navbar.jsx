import React from "react";

const Navbar = ({ user, isAdmin, hasSubscription }) => {
  return (
    <nav className="navbar bg-base-100 shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown Menu for Mobile */}
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
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/add-articles">Add Articles</a>
            </li>
            <li>
              <a href="/all-articles">All Articles</a>
            </li>
            <li>
              <a href="/subscription">Subscription</a>
            </li>
            {isAdmin && (
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
            )}
            <li>
              <a href="/my-articles">My Articles</a>
            </li>
            {hasSubscription && (
              <li>
                <a href="/premium-articles">Premium Articles</a>
              </li>
            )}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          NewsHub
        </a>
      </div>

      {/* Navbar Center for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/add-articles">Add Articles</a>
          </li>
          <li>
            <a href="/all-articles">All Articles</a>
          </li>
          <li>
            <a href="/subscription">Subscription</a>
          </li>
          {isAdmin && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          <li>
            <a href="/my-articles">My Articles</a>
          </li>
          {hasSubscription && (
            <li>
              <a href="/premium-articles">Premium Articles</a>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            {/* User Profile Photo */}
            <a href="/profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full border-2 border-gray-300"
              />
            </a>
            {/* Logout Button */}
            <button
              className="btn btn-secondary"
              onClick={() => alert("Logged Out!")}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* Login and Register */}
            <a href="/login" className="btn btn-primary">
              Login
            </a>
            <a href="/register" className="btn btn-outline">
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
