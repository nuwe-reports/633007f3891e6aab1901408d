import * as React from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({
  error,
  setError,
  showPassword,
  handleShowPass,
  setShowRegister,
  setIsLoading,
}) => {
  ///user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //login func
  function loginUser(event) {
    event.preventDefault();
    const url = process.env.REACT_APP_LOGIN_URL;
    setIsLoading(true);
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("user", response.data.email);

        navigate("/chars", { replace: true });
      })
      .catch(function (err) {
        setError(err.response.data.message);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <FormControl sx={{ width: "200px" }} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          required
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          label="email"
          placeholder="Email"
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "200px" }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="show-pass"
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
          placeholder="Password"
        />
      </FormControl>
      <div className="btn">
        <Button
          variant="outlined"
          color="inherit"
          type="submit"
          onClick={loginUser}
        >
          LOGIN
        </Button>
      </div>
      <p>
        Not resgistered yet?...Please register{" "}
        <Link
          color="secondary"
          onClick={() => {
            setShowRegister(true);
            setError("");
          }}
        >
          here
        </Link>
      </p>
    </>
  );
};

export default Login;
