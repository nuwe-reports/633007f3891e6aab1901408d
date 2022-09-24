import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Logo from "../assets/logo.png";
import ToggleThemeBTN from "./btns/ToggleThemeBTN";
import LogoutBtn from "./btns/LogoutBtn";

const ResponsiveAppBar = ({ setFavs, setIsLoading, setLogoutError }) => {
  const email = localStorage.getItem("user");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* -- navbar large */}
          <Typography
            data-testid="logo-img"
            variant="h6"
            noWrap
            component="a"
            href="/rick_morty_app/chars"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Rick and Morty" width="200px"></img>
          </Typography>
          {/* toggle dark theme  */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{ flexGrow: 0, width: { sm: "4rem" } }}
              data-testid="toggle-btn"
            >
              <ToggleThemeBTN data-testid="toggle-btn"></ToggleThemeBTN>
            </Box>
            {email && (
              <LogoutBtn
                setFavs={setFavs}
                setIsLoading={setIsLoading}
                setLogoutError={setLogoutError}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
