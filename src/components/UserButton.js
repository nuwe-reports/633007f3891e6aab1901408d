import * as React from "react";
import { useState } from "react";

import LogoutBtn from "./LogoutBtn";
import SignupBtn from "./SignupBtn";

function UserButton({ setOpenMessage, setMssg, mssg, openMessage }) {
  const [open, setOpen] = React.useState(false);
  //SHOW LOGIN-REGISTER
  const [login, setLogin] = useState(true);

  return <>{login ? <SignupBtn></SignupBtn> : <LogoutBtn></LogoutBtn>}</>;
}
export default UserButton;
