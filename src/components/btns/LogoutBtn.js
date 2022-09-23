import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutRounded } from "@mui/icons-material";

const LogoutBtn = ({ setFavs, setIsLoading, setLogoutError }) => {
  const navigate = useNavigate();

  const logout = () => {
    setLogoutError(false);
    setIsLoading(true);
    const url = process.env.REACT_APP_LOGOUT_URL;

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", "");
          localStorage.setItem("favs", "");
          setFavs([]);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error) {
          setLogoutError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
      Logout <LogoutIcon />
    </Button>
  );
};

export default LogoutBtn;
