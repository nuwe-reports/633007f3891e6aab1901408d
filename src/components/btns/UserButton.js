import * as React from "react";
import { useState, useEffect } from "react";

import LogoutBtn from "./LogoutBtn";
import SignupBtn from "./SignupBtn";

function UserButton({ setOpenMessage, setMssg, mssg, openMessage }) {
  const [open, setOpen] = React.useState(false);
  //SHOW LOGIN-REGISTER
  const [user, setUser] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("user");
    if (email) {
      setUser(email);
    }
  }, []);
  return <>{user === "" ? <SignupBtn></SignupBtn> : <LogoutBtn></LogoutBtn>}</>;
}
export default UserButton;
