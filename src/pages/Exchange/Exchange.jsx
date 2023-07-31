import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Avatar,
  Button,
  Snackbar,
  Box,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Flag as FlagIcon } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import argentinaFlag from "../../assets/argentina.png";
import usaFlag from "../../assets/usa.png";
import "./Exchange.css";
const ExchangeCard = () => {
  const [amount, setAmount] = useState("");
  const [toUSD, setToUSD] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currencyTitle, setCurrencyTitle] = useState("ARS");
  const [currencyFlag, setCurrencyFlag] = useState("argentina");
  const [exchangeRate, setExchangeRate] = useState(547);

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleExchange = () => {
    if (toUSD) {
      return (amount / 542).toFixed(0);
    } else {
      return (amount * 547).toFixed(0);
    }
  };

  const handleConfirmChange = () => {
    if (toUSD) {
      setCurrencyTitle("USD");
      setCurrencyFlag("usa");
      setExchangeRate(542);
    } else {
      setCurrencyTitle("ARS");
      setCurrencyFlag("argentina");
      setExchangeRate(547);
    }
    setToUSD((prevToUSD) => !prevToUSD);
    setAmount("");
  };
  const confirmarCambio = () => {
    if (amount.trim() !== "") {
      setShowSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box className="exchangeBox">
      <Card variant="outlined">
        <CardHeader
          title={`Cambio de Moneda - ${currencyTitle}`}
          subheader={
            <Typography>
              Cotización del Dólar Oficial: <strong>{currencyTitle}</strong>{" "}
              <strong>{exchangeRate}</strong>
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <Grid item xs={2}>
                <Avatar
                  src={currencyFlag === "argentina" ? argentinaFlag : usaFlag}
                >
                  <FlagIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {currencyTitle}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label={`Moneda ${currencyTitle}`}
                  type="number"
                  value={amount}
                  onChange={handleChangeAmount}
                  placeholder={`Ingrese monto en ${currencyTitle}`}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5.5} />
              <Grid item xs={2}>
                <IconButton>
                  <SwapVertIcon
                    onClick={handleConfirmChange}
                    fontSize="large"
                    sx={{ color: "#1693A5" }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={5} />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={2}>
                <Avatar
                  src={currencyFlag === "argentina" ? usaFlag : argentinaFlag}
                >
                  <FlagIcon />
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  {toUSD ? "USD" : "ARS"}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label={`${toUSD ? "Dólares" : "Pesos"} ${
                    toUSD ? "USD" : "ARS"
                  }`}
                  type="number"
                  value={handleExchange()}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmarCambio}
            style={{ marginTop: "25px" }}
          >
            Confirmar Cambio
          </Button>
        </CardContent>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={showSnackbar}
          onClose={handleCloseSnackbar}
          message="Cambio realizado"
          autoHideDuration={3000}
        />
      </Card>
    </Box>
  );
};
export default ExchangeCard;
