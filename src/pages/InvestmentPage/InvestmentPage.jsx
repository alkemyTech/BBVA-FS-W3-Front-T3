import { Grid } from "@mui/material";
import FixedDepositCard from "../../components/InvestmentCard/FixedTermDepositCard/FixedTermDepositCard.jsx";
import LoanCard from "../../components/InvestmentCard/LoanCard/LoanCard.jsx";
import ExchangeCard from "../../components/InvestmentCard/ExchangeCard/ExchangeCard.jsx";

import "./InvestmentPage.css";

export default function BasicCard() {
  return (
    <Grid container direction="row" spacing={2} className="grid">
      <Grid item xs={2} />
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
