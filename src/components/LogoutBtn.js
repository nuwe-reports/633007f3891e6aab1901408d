import React from "react";

import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutBtn = () => {
  return (
    <Button
      color="secondary"
      className="user-button"
      onClick={(e) => e.preventDefault()}
    >
      Logout <LogoutIcon></LogoutIcon>
    </Button>
  );
};

export default LogoutBtn;
