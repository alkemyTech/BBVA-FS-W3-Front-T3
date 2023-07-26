import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
  CardActions,
  Button,
  Avatar,
  styled,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import { AccountApi } from "../../../api/accountApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addAccountArs,
  changeBalanceArs,
} from "../../../redux/accountArsSlice";
import { addAccountUsd } from "../../../redux/accountUsdSlice";
import { ArrowForward } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

export default function Slider() {
  const [currency, setCurrency] = useState("ARS");
  const accountARS = useSelector((state) => state.accountArs);
  const accountUSD = useSelector((state) => state.accountUsd);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    AccountApi.accountInfo(user.id).then((response) => {
      console.log(response.data);
      response.data.map((account) => {
        if (account.currency === "ARS") {
          dispatch(addAccountArs(account));
        } else {
          dispatch(addAccountUsd(account));
        }
      });
    });
    AccountApi.balance().then((response) => {
      dispatch(changeBalanceArs(response.data));
    });
  }, [dispatch, user]);

  const handleForward = () => {
    setCurrency(currency === "ARS" ? "USD" : "ARS");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  return (
    <>
      <Box sx={{ flexGrow: 2, paddingLeft: "%" }}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={1} />

          <Grid item xs={2}>
            <Card sx={{ minWidth: 275, marginTop: "50px" }}>
              <CardContent>
                <Grid
                  sx={{
                    backgroundColor: "#E9FEFA",
                    margin: -2,
                    padding: 2,
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        sx={{ backgroundColor: "#E9FEFA" }}
                        alt="kitty"
                        src="/src/assets/avatarCat1.png"
                      />
                    </StyledBadge>
                  </Typography>
                  <Typography variant="h5" component="div">
                    Hola {user.name}!
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {user.email}
                  </Typography>
                </Grid>
                <Typography variant="body2">
                  Dinero disponible en cuenta{" "}
                  <b>{currency === "ARS" ? "PESOS" : "DOLARES"}</b>: <br />
                  <Typography variant="h3" marginTop={-5}>
                    <br />
                    {currency === "ARS"
                      ? `$ ${accountARS.balance}`
                      : `u$s ${accountUSD.balance}`}
                  </Typography>
                  {currency === "ARS"
                    ? `cbu: ${accountARS.cbu}`
                    : `cbu: ${accountUSD.cbu}`}
                  <br />
                  <IconButton onClick={handleForward}>
                    <br />
                    <br />
                    <ArrowBackIcon /> Moneda <ArrowForward />
                  </IconButton>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigate("/depositos");
                  }}
                >
                  Ingresar Dinero
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    navigate("/transferencias");
                  }}
                >
                  Transferir Dinero
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345, marginTop: "10px" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Actividad
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <CardActionArea>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Transacciones en Pesos"
                        secondary="actividad en $ realizada"
                      />
                    </ListItem>
                  </CardActionArea>
                  <CardActionArea>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Transacciones en Dolares" />
                    </ListItem>
                  </CardActionArea>
                  <CardActionArea>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Depositos realizados" />
                    </ListItem>
                  </CardActionArea>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              sx={{
                maxWidth: 500,
                maxHeight: 600,
                marginTop: "50px",
                marginLeft: "50px",
              }}
            >
              <CardContent>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  Transacciones recientes
                </Typography>

                <List>
                  {generate(
                    <ListItem>
                      <ListItemText primary="Single-line item" />
                    </ListItem>,
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
