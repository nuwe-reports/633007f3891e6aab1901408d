import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutBtn = ({ setFavs }) => {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("https://the-movieapp.herokuapp.com/auth/logout")
      .then(() => {
        localStorage.setItem("user", "");
        localStorage.setItem("favs", "");
        setFavs([]);
        navigate("/");
        console.log("bye");
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
      data-testid="logout"
    >
      <LogoutIcon></LogoutIcon>
    </Button>
  );
};

export default LogoutBtn;
