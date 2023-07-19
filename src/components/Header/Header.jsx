import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import CustomAvatar from "../Icons/CustomAvatar";

export default function Header() {
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

  return (
    <AppBar position="absolute">
      <Toolbar sx={{backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.primary.darker : theme.palette.grey[800] }}>
        <Grid container sx={{ placeItems: "center" }} spacing={2}>
          <Grid item xs={1}>
            <Box
              component="img"
              sx={{ height: 30 }}
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
              <Tab label="Inicio" onClick={handleClickInicio} />
              <Tab label="Transferencias" onClick={handleClickTransferencias} />
              <Tab label="Depositos" onClick={handleClickDepositos} />
              <Tab label="Inversiones" onClick={handleClickInversiones} />
            </Tabs>
          </Grid>
          <Grid item xs={2} />
          <Grid item sx={{ placeContent: "left" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.grey[800]}}>RS</Avatar>
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
