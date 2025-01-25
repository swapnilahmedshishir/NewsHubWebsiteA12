import React, { useContext } from "react";
import { AppContext } from "../../Context/ContextProvider";
import useAdmin from "../../Hook/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const loaction = useLocation();
  // Show a loading state if admin status or user info is still loading
  if (isAdminLoading || user === undefined) {
    return <div>Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: loaction.pathname }} replace />;
};

export default AdminRoute;
