import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { logoutUser } from "../../redux/userSlice.js";
import { toast } from "react-toastify";
import logo from "../../assets/logo-no-background.svg";
import { logoutAccountArs } from "../../redux/accountArsSlice.js";
import { logoutAccountUsd } from "../../redux/accountUsdSlice.js";

function stringToColor(string) {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (!name || typeof name !== "string") {
    return {
      sx: {
        bgcolor: "gray",
      },
      children: "U",
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
  const location = useLocation();
  const dispatch = useDispatch();

  const routes = [
    { label: "Inicio", path: "/inicio" },
    { label: "Transferencias", path: "/transferencias" },
    { label: "Depositos", path: "/depositos" },
    { label: "Pagos", path: "/pagos" },
    { label: "Inversiones", path: "/inversiones" },
  ];

  useEffect(() => {
    const path = location.pathname;
    const activeTab = routes.findIndex((route) => route.path === path);
    setValue(activeTab !== -1 ? activeTab : 0);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabClick = (index) => {
    const route = routes[index];
    navigate(route.path);
  };

  const handleClickLogo = () => {
    navigate("/inicio");
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(logoutUser());
    dispatch(logoutAccountArs());
    dispatch(logoutAccountUsd());

    toast.success("¡Cerraste sesión correctamente!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1693a5" }}>
      <Toolbar>
        <Grid container sx={{ placeItems: "center" }} spacing={2}>
          <Grid item xs={1} onClick={handleClickLogo}>
            <Box
              component="img"
              sx={{ height: 40 }}
              alt="Your logo."
              src={logo}
            />
          </Grid>
          <Grid item xs={8}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={handleChange}
            >
              {routes.map((route, index) => (
                <Tab
                  key={index}
                  label={route.label}
                  onClick={() => handleTabClick(index)}
                  sx={{ color: "white" }}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={2} />
          <Grid item sx={{ placeContent: "left" }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar {...stringAvatar(user.name)}></Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Avatar />
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
                <Typography textAlign="center">Mi Cuenta</Typography>
              </MenuItem>
              <MenuItem onClick={handleClickLogOut}>
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
