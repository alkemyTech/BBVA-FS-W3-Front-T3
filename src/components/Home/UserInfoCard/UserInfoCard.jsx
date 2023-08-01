/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
  Avatar,
  styled,
  Badge,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useState } from "react";
const formatNumberWithCommas = (number) => {
  return new Intl.NumberFormat("es-AR").format(number);
};

export default function UserInfoCard({
  currency,
  accountARS,
  accountUSD,
  user,
  onChangeCurrency,
}) {
  const navigate = useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: -3,
        left: -3,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.5s infinite ease-in-out",
        border: "3px solid currentColor",
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
  const [isRotating, setIsRotating] = useState(false);

  const handleButtonClick = () => {
    setIsRotating((prevState) => !prevState);
  };

  const onAnimationEnd = () => {
    setIsRotating(false);
  };

  const handleCurrencyChange = () => {
    handleButtonClick();
    const newCurrency = currency === "ARS" ? "USD" : "ARS";
    onChangeCurrency(newCurrency); // Comunicar el cambio de moneda al componente padre (HomePage)
  };

  return (
    <Card sx={{ minWidth: 300, boxShadow: "5px 5px 15px #CFCFCF" }}>
      <CardContent>
        <Grid
          sx={{
            backgroundColor: "#E9FEFA",
            margin: -2,
            padding: 2,
            marginBottom: 1,
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
        <Box variant="body1">
          Dinero disponible en cuenta <b></b>: <br />
          <Typography variant="h4" marginTop={-5}>
            <br />
            {currency === "ARS"
              ? `$ ${formatNumberWithCommas(accountARS.balance.toFixed(2))}`
              : `u$s ${formatNumberWithCommas(accountUSD.balance.toFixed(2))}`}
          </Typography>
          <br />
          <Typography variant="body1">
            {currency === "ARS"
              ? `CBU: ${accountARS.cbu}`
              : `CBU: ${accountUSD.cbu}`}
          </Typography>
          <br />
          <br />
          <Grid container sx={{ placeItems: "center" }}>
            <Grid item xs={3}>
              <IconButton>
                <CurrencyExchangeIcon
                  fontSize="large"
                  color="primary"
                  onClick={handleCurrencyChange}
                  sx={{
                    animation: isRotating
                      ? "spin 0.5s linear 1 forwards" // 1 rotation in 1 second and then stays in the final position
                      : "none", // Set 'none' to stop the animation when not rotating
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(0deg)",
                      },
                      "100%": {
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                  onAnimationEnd={onAnimationEnd}
                />
              </IconButton>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" fontSize={"16px"}>
                {currency === "ARS" ? "  PESOS" : "DOLARES"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
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
  );
}
