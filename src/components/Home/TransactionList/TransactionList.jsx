import React from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import TransactionsApi from "../../../api/transactionsApi";
import { useSelector } from "react-redux";

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
    <Card
      sx={{
        maxWidth: 500,
        maxHeight: 600,
        marginTop: "70px",
        marginLeft: "50px",
      }}
    >
      <CardContent>
        <Grid
          sx={{
            backgroundColor: "#E9FEFA",
            margin: -2,
            padding: 2,
            marginBottom: 1,
          }}
        >
          <Typography variant="h5" component="div">
            Transacciones recientes
          </Typography>
        </Grid>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText primary={`Transacción ID: ${transaction.id}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
