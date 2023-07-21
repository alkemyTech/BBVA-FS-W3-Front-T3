import { Grid } from "@mui/material";
import FixedDepositCard from "../../components/InvestmentCard/FixedTermDepositCard/FixedTermDepositCard.jsx";
import LoanCard from "../../components/InvestmentCard/LoanCard/LoanCard.jsx";
import ExchangeCard from "../../components/InvestmentCard/ExchangeCard/ExchangeCard.jsx";
export default function BasicCard() {
  return (
    <Grid container direction="row" spacing={3} sx={{ padding: 4 }}>
      <Grid item xs={3}>
        <LoanCard />
      </Grid>
      <Grid item xs={3}>
        <FixedDepositCard />
      </Grid>
      <Grid item xs={3}>
        <ExchangeCard />
      </Grid>
    </Grid>
  );
}
