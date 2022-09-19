import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../../context/ThemeContext";

export default function ToggleThemeBTN() {
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.colorMode.toggleColorMode}
        color="secondary"
      >
        {colorMode.mode === "light" ? (
          <DarkModeIcon data-testid="dark-mode" />
        ) : (
          <LightModeIcon data-testid="light-mode" />
        )}
      </IconButton>
    </>
  );
}
