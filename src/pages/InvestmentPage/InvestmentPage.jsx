import { Grid } from "@mui/material";
import InvestmentCard from "../../components/InvestmentCard/InvestmentCard.jsx";
export default function BasicCard() {
  return (
    <Grid container direction="row" spacing={3} sx={{ padding: 4 }}>
      <Grid item xs={3}>
        <InvestmentCard
          title="Prestamo"
          description="Solicita un prestamo"
          image="src/assets/loan.jpg"
          alt="prestamo"
          action="Pedir"
        />
      </Grid>
      <Grid item xs={3}>
        <InvestmentCard
          title="Plazo Fijo"
          description="Pide un plazo fijo"
          image="src/assets/fixeddeposit.jpg"
          alt="plazo fijo"
          action="Crear"
        />
      </Grid>
      <Grid item xs={3}>
        <InvestmentCard
          title="Compra/Venta de Dolares"
          description="Compra o vende dolares"
          image="src/assets/exchange.png"
          alt="exchange"
          action="Operar"
        />
      </Grid>
    </Grid>
  );
}
