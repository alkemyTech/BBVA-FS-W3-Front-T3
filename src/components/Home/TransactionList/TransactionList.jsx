import { Grid, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi.js";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    TransactionsApi.getTransactionsByUserId(user.id)
      .then((lista) => {
        console.log(lista);
        setTransactions(lista);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  return (
    <Grid container sx={{}}>
      <Grid item xs={10}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            backgroundColor: "#E9FEFA",
          }}
        >
          Transacciones recientess
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <List>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
