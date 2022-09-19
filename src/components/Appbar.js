import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Logo from "../assets/logo.png";
import ToggleThemeBTN from "./btns/ToggleThemeBTN";
import LogoutBtn from "./btns/LogoutBtn";

const ResponsiveAppBar = ({ setFavs }) => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const email = localStorage.getItem("user");
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" data-testid="app-bar">
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
              display: { xs: "flex" },
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={Logo}
              data-testid="logo-img"
              alt="Rick and Morty"
              width="200px"
            ></img>
          </Typography>
          {/* toggle dark theme  */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
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
              <ToggleThemeBTN
                onClick={handleCloseNavMenu}
                data-testid="toggle-btn"
              ></ToggleThemeBTN>

              {email !== "" && (
                <Typography textAlign="center">
                  <LogoutBtn onClick={handleCloseNavMenu} setFavs={setFavs} />
                </Typography>
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ flexGrow: 0, width: { xs: "10%", md: "5%" } }}>
              <ToggleThemeBTN data-testid="toggle-btn"></ToggleThemeBTN>
            </Box>
            {email !== "" && <LogoutBtn setFavs={setFavs} />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
