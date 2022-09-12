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
}) => {
  ///user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //login func
  function loginUser(event) {
    event.preventDefault();
    axios
      .post("https://the-movieapp.herokuapp.com/auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("user", response.data.email);
        console.log(response);
        console.log("logged in");
        navigate("/chars", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // event.preventDefault();
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email: email, password: password }),
  // };
  // fetch("/auth/login", requestOptions)
  //   .then((response) =>
  //     response
  //       .json()
  //       .then((data) => {
  //         onLogin({ email: data.email, name: data.name });
  //         // navigate('/', {replace: true})
  //         setEmail("");
  //         setPassword("");
  //         if (response.status === 200) {
  //           setLogin(false);
  //           setMssg(
  //             `Hi ${
  //               data.name.charAt(0).toUpperCase() + data.name.slice(1)
  //             }, welcome to MovieApp :)`
  //           );
  //           setOpenMessage(true);
  //         } else {
  //           setError(data.message);
  //         }
  //       })
  //   )
  //   .catch((err) => console.log(err));

  return (
    <>
      <FormControl variant="outlined">
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

      <FormControl sx={{ m: 1 }} variant="outlined">
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
          }}
        >
          here
        </Link>
      </p>
    </>
  );
};

export default Login;
