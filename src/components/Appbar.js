import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import Logo from "../assets/logo.png";

import { NavLink } from "react-router-dom";
import Link from "@mui/material/Link";
import ToggleThemeBTN from "./btns/ToggleThemeBTN";
import UserButton from "./btns/UserButton";

const ResponsiveAppBar = ({ setOpenMessage, setMssg, mssg, openMessage }) => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const email = localStorage.getItem("user");
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* -- navbar large */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={email !== "" ? "/chars" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Rick and Morty" width="200px"></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <>
                <MenuItem key="Myfavs" onClick={handleCloseNavMenu}>
                  <Link underline="none" color="inherit" href="/user">
                    <Typography textAlign="center">♥️</Typography>
                  </Link>
                </MenuItem>
              </>

              <MenuItem key="Login" onClick={handleCloseNavMenu}>
                <Link underline="none" color="inherit">
                  <Typography textAlign="center">
                    <UserButton />
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href={email !== "" ? "/chars" : "/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Rick and Morty" width="200px"></img>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <>
              <Button
                key="myFavs"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "secondary.main", display: "block" }}
                href="/user"
              >
                ♥️
              </Button>
            </>

            <UserButton
              setOpenMessage={setOpenMessage}
              setMssg={setMssg}
              mssg={mssg}
              openMessage={openMessage}
            ></UserButton>
          </Box>

          {/* toggle dark theme  */}
          <Box sx={{ flexGrow: 0, width: { xs: "10%", md: "5%" } }}>
            <ToggleThemeBTN></ToggleThemeBTN>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
