import { Grid, List } from "@mui/material";
import TransactionCard from "../TransactionList/TransactionCard.jsx";

export default function TransactionList() {
  return (
    <Grid
      container
      sx={{
        marginTop: "3vh",
        marginLeft: "50px",
        padding: 2,
      }}
    >
      <Grid item xs={12}>
        <List>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </List>
      </Grid>
    </Grid>
  );
}
