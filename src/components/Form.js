import * as React from "react";

import { useState } from "react";
import faces from "../assets/faces.png";
import Login from "./Login";
import Register from "./Register";
import { Paper } from "@mui/material";

const Form = () => {
  ////  password visibility icon

  const [showPassword, setShowPassword] = useState();
  const handleShowPass = (e) => {
    e.preventDefault();
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  // show register or login form
  const [showRegister, setShowRegister] = useState(true);
  //error msg
  const [error, setError] = useState("");
  //close dialog

  return (
    <Paper variant="outlined" sx={{ backgroundColor: "primary.main" }}>
      <div className="form">
        {error !== "" && <p style={{ color: "#FE0D13" }}>{error}</p>}
        <img
          src={faces}
          alt="Rick and Morty faces looking to each other"
          width="300px"
        ></img>
        {showRegister ? (
          <Register
            error={error}
            setError={setError}
            handleShowPass={handleShowPass}
            showPassword={showPassword}
            setShowRegister={setShowRegister}
          ></Register>
        ) : (
          <Login
            error={error}
            setError={setError}
            handleShowPass={handleShowPass}
            showPassword={showPassword}
            setShowRegister={setShowRegister}
          ></Login>
        )}
      </div>
    </Paper>
  );
};

export default Form;
