import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

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
          }}
          label="name"
        />
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
          }}
          label="email"
        />
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
