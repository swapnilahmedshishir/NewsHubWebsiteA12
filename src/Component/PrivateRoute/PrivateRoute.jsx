import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/ContextProvider";

// Mock authentication status (replace this with your actual auth logic)

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AppContext);

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
