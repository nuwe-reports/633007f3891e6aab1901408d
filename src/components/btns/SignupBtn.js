import React from "react";

import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
const SignupBtn = () => {
  return (
    <Button
      className="user-button"
      color="secondary"
      onClick={(e) => e.preventDefault()}
    >
      Sign Up<PersonIcon></PersonIcon>
    </Button>
  );
};

export default SignupBtn;
