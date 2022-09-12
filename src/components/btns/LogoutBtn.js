import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutBtn = () => {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("https://the-movieapp.herokuapp.com/auth/logout")
      .then((response) => {
        localStorage.setItem("user", "");
        localStorage.setItem("favs", []);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      color="secondary"
      className="user-button"
      onClick={(e) => {
        e.preventDefault();
        logout();
      }}
    >
      Logout <LogoutIcon></LogoutIcon>
    </Button>
  );
};

export default LogoutBtn;
