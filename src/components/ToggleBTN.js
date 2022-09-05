import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../context/ThemeContext";

export default function ToggleBTN() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.colorMode.toggleColorMode}
        color="secondary"
      >
        {colorMode.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </>
  );
}
