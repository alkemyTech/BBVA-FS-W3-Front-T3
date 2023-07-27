/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  CardActions,
  Button,
  Avatar,
  styled,
  Badge,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UserInfoCard({
  currency,
  accountARS,
  accountUSD,
  user,
  handleForward,
}) {
  const navigate = useNavigate();
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

  return (
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
        <Typography variant="body2">
          Dinero disponible en cuenta{" "}
          <b>{currency === "ARS" ? "PESOS" : "DOLARES"}</b>: <br />
          <Typography variant="h4" marginTop={-5}>
            <br />
            {currency === "ARS"
              ? `$ ${accountARS.balance.toFixed(2)}`
              : `u$s ${accountUSD.balance.toFixed(2)}`}
          </Typography>
          {currency === "ARS"
            ? `cbu: ${accountARS.cbu}`
            : `cbu: ${accountUSD.cbu}`}
          <br />
          <IconButton onClick={handleForward}>
            <br />
            <br />
            <ArrowBack /> Moneda <ArrowForward />
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
  );
}
