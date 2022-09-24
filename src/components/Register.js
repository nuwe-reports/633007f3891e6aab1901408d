import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = ({
  setError,
  setIsLoading,
  setErrMssg,
  handleShowPass,
  setShowRegister,
  showPassword,
}) => {
  ///USER
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //errors
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwError, setPasswError] = useState("");

  //register func

  function registerUser(event) {
    event.preventDefault();
    setIsLoading(true);
    const url = process.env.REACT_APP_REGISTER_URL;
    axios
      .post(url, {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setShowRegister(false);
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          const errors = error.response.data.messages;
          const fields = error.response.data.fields;

          if (fields.some((item) => item === "name"))
            setNameError(errors[fields.indexOf("name")]);

          if (fields.some((item) => item === "email"))
            setMailError(errors[fields.indexOf("email")]);

          if (fields.some((item) => item === "password"))
            setPasswError(errors[fields.indexOf("password")]);
        } else if (error.response.status === 409) {
          setErrMssg(error.response.data.messages);
        } else if (error.response.status === 500) {
          setErrMssg("An unexpected error happened, please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <FormControl variant="outlined" sx={{ width: "200px" }}>
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
            setErrMssg("");
          }}
          label="name"
          placeholder="Name"
        />
        {nameError !== "" && <p style={{ color: "#FE0D13" }}>{nameError}</p>}
      </FormControl>

      <FormControl sx={{ m: 1, width: "200px" }} variant="outlined">
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
            setErrMssg("");
          }}
          label="email"
          placeholder="Email"
        />
        {mailError !== "" && <p style={{ color: "#FE0D13" }}>{mailError}</p>}
      </FormControl>

      <FormControl sx={{ m: 1, width: "200px" }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
            setPasswError("");
            setErrMssg("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="show-pass"
                aria-label="toggle password visibility"
                onClick={handleShowPass}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="password"
          placeholder="Password"
        />
        {passwError !== "" && <p style={{ color: "#FE0D13" }}>{passwError}</p>}
      </FormControl>
      <div className="btn">
        <Button
          variant="outlined"
          color="inherit"
          type="submit"
          onClick={registerUser}
        >
          REGISTER
        </Button>
      </div>
      <p>
        Already registered? Please login{" "}
        <Link
          color="secondary"
          onClick={() => {
            setShowRegister(false);
            setError(false);
            setNameError("");
            setMailError("");
            setPasswError("");
            setErrMssg("");
          }}
        >
          here
        </Link>
      </p>
    </>
  );
};

export default Register;
