import * as React from "react";

import { useState } from "react";
import rickAndMorty from "../assets/rick-and-morty.png";
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
  const [errMssg, setErrMssg] = useState("");
  //close dialog

  return (
    <Paper variant="outlined" sx={{ backgroundColor: "primary.main" }}>
      <div className="form">
        {error !== "" && <p style={{ color: "#FE0D13" }}>{error}</p>}
        {errMssg !== "" && <p style={{ color: "#FE0D13" }}>{errMssg}</p>}
        <img
          src={rickAndMorty}
          alt="Rick holding Morty's eyes opened"
          width="300px"
          data-testid="rick-and-morty-img"
        ></img>
        {showRegister ? (
          <Register
            error={error}
            setError={setError}
            errMssg={errMssg}
            setErrMssg={setErrMssg}
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
