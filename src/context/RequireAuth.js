import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState("");
  const email = localStorage.getItem("user");

  if (email === "") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
export default RequireAuth;
