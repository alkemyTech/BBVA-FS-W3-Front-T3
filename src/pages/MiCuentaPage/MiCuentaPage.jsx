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
      <Grid container direction="row" spacing={2} className="grid">
        <Grid item xs={6} sm={6} md={3}>
          <CuentaPesos />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CuentaDolares />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2} className="grid">
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleDepositosClick}
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "white",
              marginRight: "170px",
              width: "200px",
            }}
          >
            Depósito
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ paddingTop: "0px" }}>
          <Button
            variant="contained"
            onClick={handleTransferenciasClick}
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "white",
              width: "200px",
              textAlign: "right",
              marginLeft: "100px",
            }}
          >
            Transferencias
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
