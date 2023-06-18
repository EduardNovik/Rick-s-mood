import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import ModalSearch from "../Search/ModalSearch";

const pages: string[] = ["Home", "Favorites", "About"];
const settings: string[] = ["Profile", "Logout"];

const Header: FC = (): ReactElement => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
    <>
      <AppBar
        position="fixed"
        sx={{ backdropFilter: "blur(10px)", backgroundColor: "rgb(39, 43, 51)" }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                flexDirection: "column",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(90%)",
                },
              }}
            >
              <img src={logo} alt="logo" style={{ height: "65px" }} />
            </Typography>
            <Typography
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto",
                fontWeight: 300,
                color: "inherit",
              }}
            >
              Rick's mood
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component="a"
                      href={page === "Home" ? "/" : page}
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Roboto",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Logo in xs */}
            <Typography
              component="a"
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                flexGrow: 1,
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(95%)",
                },
              }}
            >
              <img src={logo} alt="logo" style={{ height: "55px" }} />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "end" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page === "Home" ? "/" : page}
                  key={page}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "Roboto",
                      fontWeight: 300,
                      textTransform: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        boxShadow: "0px 0px 20px 0px dimgray",
                        transform: "scale(90%)",
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
            {/* Menu 3 lines */}
            <Box sx={{ flexGrow: 0, pl: "10px", display: "flex" }}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ModalSearch />
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="E" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                  }}
                >
                  <ModalSearch />
                </Box>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Header;
