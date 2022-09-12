import * as React from "react";
import { useState, useEffect } from "react";

import LogoutBtn from "./LogoutBtn";
import SignupBtn from "./SignupBtn";

function UserButton() {
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
