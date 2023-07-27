import {Divider, Grid, List, Typography} from "@mui/material";
import TransactionCard from "../TransactionList/TransactionCard.jsx";

export default function TransactionList() {
  return (
    <Grid
      container
      sx={{
      }}
    >
      <Grid item xs={10}>
        <Typography variant="h5" sx={{
          textAlign:"center",
          backgroundColor:"#E9FEFA",
        }}>
          Transacciones recientess
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <List>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
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
