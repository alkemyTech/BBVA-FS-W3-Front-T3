import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Avatar,
  Button,
  Box,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Divider,
} from "@mui/material";
import { Flag as FlagIcon } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import argentinaFlag from "../../assets/argentina.png";
import usaFlag from "../../assets/usa.png";
import "./Exchange.css";
import TradeApi from "../../api/exchangeApi.js";
import GenericModal from "../../components/Modal/GenericModal.jsx";
import { useNavigate } from "react-router-dom";
const ExchangeCard = () => {
  const [amount, setAmount] = useState("");
  const [toUSD, setToUSD] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currencyTitle, setCurrencyTitle] = useState("ARS");
  const [currencyFlag, setCurrencyFlag] = useState("argentina");
  const [exchangeRate, setExchangeRate] = useState(547);
  const [tradeData, setTradeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    TradeApi.simulateDollarPurchase(1000).then((data) => {
      setExchangeRate(data.dollarValue);
    });
  }, []);

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleExchange = () => {
    if (toUSD) {
      return (amount / exchangeRate).toFixed(2);
    } else {
      return (amount * exchangeRate).toFixed(2);
    }
  };

  const handleToggleCurrency = () => {
    if (toUSD) {
      setCurrencyTitle("USD");
      setCurrencyFlag("usa");
    } else {
      setCurrencyTitle("ARS");
      setCurrencyFlag("argentina");
    }
    setToUSD((prevToUSD) => !prevToUSD);
    setAmount("");
  };
  const confirmarCambio = () => {
    setIsLoading(true);
    setShowModal(true);
    if (amount.trim() !== "") {
      TradeApi.simulateDollarPurchase(amount).then((response) => {
        console.log(response);
        setTradeData(response);
        setIsLoading(false);
      });
    }
  };

  const handlePurchase = () => {
    TradeApi.dollarPurchase(amount).then(() => {
      setShowModal(false);
      navigate("/");
    });
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
                    onClick={handleToggleCurrency}
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
        {showModal && (
          <GenericModal
            open={showModal}
            title="Compra de Moneda Extranjera"
            content={
              isLoading ? (
                <Skeleton variant="rectangular" width={210} height={118} />
              ) : (
                <Grid container spacing={2} sx={{ width: "500px" }}>
                  {/* First column */}
                  <Grid item>
                    <List>
                      <ListItem>
                        <ListItemText primary={`Valor del Dolar Oficial:`} />
                      </ListItem>

                      <ListItem>
                        <ListItemText primary={`Valor con impuestos:`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Dolares a acreditar:`} />
                      </ListItem>
                    </List>
                  </Grid>

                  {/* Second column */}
                  <Grid item>
                    <List>
                      <ListItem>
                        <ListItemText primary={` ${tradeData.dollarValue}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={` ${tradeData.dollarValueWithTax}`}
                        />
                      </ListItem>
                      <ListItem>
                        <Typography
                          className="name"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          {tradeData.amountInDollars}
                        </Typography>
                      </ListItem>
                    </List>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item>
                    <Typography align="center" sx={{ fontWeight: "bold" }}>
                      IMPUESTOS
                    </Typography>
                    <List>
                      <ListItemText>{`Impuesto pais:`}</ListItemText>
                      <ListItemText align="center" sx={{ color: "red" }}>
                        {tradeData.impuestoPais * 100}%
                      </ListItemText>
                      <ListItemText>{`Retencion de ganancias:`}</ListItemText>
                      <ListItemText align="center" sx={{ color: "red" }}>
                        {tradeData.retencionGanancias * 100}%
                      </ListItemText>
                    </List>
                  </Grid>
                </Grid>
              )
            }
            onClose={() => setShowModal(false)}
            onAccept={handlePurchase}
          />
        )}
      </Card>
    </Box>
  );
};
export default ExchangeCard;
