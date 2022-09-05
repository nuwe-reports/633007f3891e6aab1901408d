import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function UserButton({ setOpenMessage, setMssg, mssg, openMessage }) {
  const [open, setOpen] = React.useState(false);
  //SHOW LOGIN-REGISTER
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  function logOut(event) {}

  const logIn = () => {};

  return (
    <>
      {!isLogged ? (
        <Button className="user-button" color="secondary" onClick={logIn}>
          Login <PersonIcon></PersonIcon>
        </Button>
      ) : (
        <Button color="secondary" className="user-button" onClick={logOut}>
          Logout <LogoutIcon></LogoutIcon>
        </Button>
      )}
    </>
  );
}
export default UserButton;
