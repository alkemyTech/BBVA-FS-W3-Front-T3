import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward.js";

export default function Slider() {
  const [currency, setCurrency] = useState("ARS");
  const accountARS = useSelector((state) => state.accountArs);
  const accountUSD = useSelector((state) => state.accountUsd);

  const handleBack = () => {
    setCurrency(currency === "ARS" ? "USD" : "ARS");
  };
  const handleForward = () => {
    setCurrency(currency === "ARS" ? "USD" : "ARS");
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        placeItems: "center",
        alignItems: "center",
      }}
      // sx={{ placeItems: "center", marginTop:"100px" }}
    >
      <Grid item xs={3} />
      <Grid item xs={1} sx={{ alignItems: "center", placeItems: "center" }}>
        <IconButton
          aria-label="delete"
          sx={{ justify: "center" }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>

      <Grid
        item
        sx={{ width: "600px", alignItems: "center", placeItems: "center" }}
      >
        <Card sx={{ maxWidth: 400, paddingLeft: "10px" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom>
                {currency === "ARS" ? "PESOS" : "DOLARES"}
              </Typography>
              <Typography gutterBottom align="center">
                {currency === "ARS" ? accountARS.balance : accountUSD.balance}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="delete" onClick={handleForward}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}
