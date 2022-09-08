import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useState } from "react";
import faces from "../assets/faces.png";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = ({
  error,
  setError,
  handleShowPass,
  setShowRegister,
  showPassword,
}) => {
  ///USER
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //ERRR
  // const [error, setError] = useState(false);
  const [errMssg, setErrMssg] = useState(null);
  const errFields = ["name", "email", "password"];

  //errors
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwError, setPasswError] = useState("");

  //register func
  function registerUser(event) {
    event.preventDefault();
    axios
      .post("https://the-movieapp.herokuapp.com/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setShowRegister(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("err");
        if (error.response.status === 400) {
          const errors = error.response.data.messages;
          const fields = error.response.data.fields;
          console.log("400");
          if (fields.some((item) => item === "name"))
            setNameError(errors[fields.indexOf("name")]);
          console.log(nameError);
          if (fields.some((item) => item === "email"))
            setMailError(errors[fields.indexOf("email")]);

          if (fields.some((item) => item === "password"))
            setPasswError(errors[fields.indexOf("password")]);
        } else if (error.response.status === 409) {
          console.log("409");
          setErrMssg(error.response.data.messages);
        } else if (error.response.status === 500) {
          console.log("500");
          setErrMssg("An unexpected error happened, please try again.");
        }
      });
  }

  return (
    <>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name"
          required
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError(false);
            setNameError("");
          }}
          label="name"
        />
        {nameError !== "" && <p style={{ color: "#FE0D13" }}>{nameError}</p>}
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          required
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(false);
            setMailError("");
          }}
          label="email"
        />
        {mailError !== "" && <p style={{ color: "#FE0D13" }}>{mailError}</p>}
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
            setPasswError("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPass}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="password"
        />
        {passwError !== "" && <p style={{ color: "#FE0D13" }}>{passwError}</p>}
      </FormControl>

      <Button variant="contained" type="submit" onClick={registerUser}>
        Register
      </Button>

      <p>
        Already registered? Please login{" "}
        <Link
          color="secondary"
          onClick={() => {
            setShowRegister(false);
          }}
        >
          here
        </Link>
      </p>
    </>
  );
};

export default Register;
