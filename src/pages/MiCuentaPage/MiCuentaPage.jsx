import React from "react";
import { Grid } from "@mui/material";
import CuentaDolares from "../../components/MiCuentaCard/CuentaDolares/CuentaDolares";
import CuentaPesos from "../../components/MiCuentaCard/CuentaPesos/CuentaPesos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./MiCuentaPage.css";

export default function BasicCard() {
  const navigate = useNavigate();

  const handleDepositosClick = () => {
    navigate("/depositos");
  };

  const handleTransferenciasClick = () => {
    navigate("/transferencias");
  };

  return (
    <div className="center-container">
      <Grid container direction="row" spacing={4} className="grid">
        <Grid item xs={12} sm={6} md={3}>
          <CuentaPesos />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CuentaDolares />
        </Grid>
        <Grid item xs={12} className="button-container">
          <Button
            variant="contained"
            onClick={handleDepositosClick}
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "white",
            }}
          >
          Depósito  
          </Button>
          <Button
            variant="contained"
            onClick={handleTransferenciasClick}
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "white",
            }}
          >
            Transferencias
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
