import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const email = localStorage.getItem("user");

  if (email === "") {
    return <Navigate to="/rick_morty_app" state={{ from: location }} replace />;
  }
  return children;
};
export default RequireAuth;
