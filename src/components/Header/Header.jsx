import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Tooltip,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { Grid, Tabs, Tab } from "@mui/material";

import logo from "../../assets/3.png";
import titulo from "../../assets/titulo.svg";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name || typeof name !== "string") {
    // If the name is empty, null, undefined, or not a string, return a default avatar.
    return {
      sx: {
        bgcolor: "gray", // Set the default background color for the avatar
      },
      children: "U", // You can set any default value here, like "U" for "Unknown."
    };
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function Header() {
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickAccount = () => {
    navigate("/account");
  };

  const handleClickLogOut = () => {
    navigate("/logout");
  };

  const handleClickInicio = () => {
    navigate("/inicio");
  };

  const handleClickTransferencias = () => {
    navigate("/transferencias");
  };

  const handleClickDepositos = () => {
    navigate("/depositos");
  };

  const handleClickInversiones = () => {
    navigate("/inversiones");
  };

  function handleLogoClick() {
    return navigate("/inicio");
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Grid container sx={{ placeItems: "center" }} spacing={2}>
          <Grid item xs={1} onClick={handleLogoClick}>
            <Box
              component="img"
              sx={{ height: 30 }}
              alt="Your logo."
              src={logo}
            />
            <Box
              component="img"
              sx={{ height: 20 }}
              alt="Your logo."
              src={titulo}
            />
          </Grid>
          <Grid item xs={8}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Inicio" onClick={handleClickInicio} />
              <Tab label="Transferencias" onClick={handleClickTransferencias} />
              <Tab label="Depositos" onClick={handleClickDepositos} />
              <Tab label="Inversiones" onClick={handleClickInversiones} />
            </Tabs>
          </Grid>
          <Grid item xs={2} />
          <Grid item sx={{ placeContent: "left" }}>
            {user ? ( // Check if user is not null or undefined
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar {...stringAvatar(user.name)}></Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Avatar /> // Replace with your custom fallback avatar component
            )}
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
              <MenuItem onClick={handleClickAccount}>
                <Typography textAlign="center">Cuenta</Typography>
              </MenuItem>
              <MenuItem onClick={handleClickLogOut}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Grid>
          {/* <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/loginIn"> LogIn </Button>
                    </Grid>
                    <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/signUp"> SignUp </Button>
                    </Grid> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
