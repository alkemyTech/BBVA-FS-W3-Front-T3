import { Grid } from "@mui/material";
import CuentaDolares from "../../components/MiCuentaCard/CuentaDolares/CuentaDolares";
import CuentaPesos from "../../components/MiCuentaCard/CuentaPesos/CuentaPesos";

import "./MiCuentaPage.css";

export default function BasicCard() {
  return (
    <Grid container direction="row" spacing={2} className="grid">
      <Grid item xs={2} />
      <Grid item xs={3}>
        <CuentaDolares />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={3}>
        <CuentaPesos />
      </Grid>
    </Grid>
  );
}
