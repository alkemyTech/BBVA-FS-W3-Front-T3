import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi";
import { useSelector } from "react-redux";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   TransactionsApi.getTransactionsByUserId(user.id)
  //     .then((lista) => {
  //       console.log(lista);
  //       setTransactions(lista);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [user]);

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
