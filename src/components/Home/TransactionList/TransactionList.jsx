import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, List, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

export default function TransactionList({ currency, showAllTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Estado para la carga inicial
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Estado para la transacción seleccionada
  const user = useSelector((state) => state.user);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction); // Actualizar la transacción seleccionada al hacer clic
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mostrar todas las transacciones sin filtrar si showAllTransactions es true
      if (showAllTransactions) {
        TransactionsApi.getTransactionsByUserId(user.id, page, pageSize)
          .then((data) => {
            setTransactions(data?._embedded?.transactionList || []);
            setTotalPages(data?.page?.totalPages || 0);
            setLoading(false);
            if (initialLoading) {
              setInitialLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            if (initialLoading) {
              setInitialLoading(false);
            }
          });
      } else {
        // Filtrar las transacciones según la moneda seleccionada
        TransactionsApi.getTransactionsByUserId(user.id, page, pageSize)
          .then((data) => {
            const filteredTransactions = data?._embedded?.transactionList?.filter((transaction) => {
              return transaction.account.currency === currency;
            }) || [];
            setTransactions(filteredTransactions);
            setTotalPages(data?.page?.totalPages || 0);
            setLoading(false);
            if (initialLoading) {
              setInitialLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            if (initialLoading) {
              setInitialLoading(false);
            }
          });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [user, page, pageSize, currency, initialLoading, showAllTransactions]);

  if (initialLoading) {
    return (
      <Box sx={{ width: 500 }}>
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ margin: "1px", padding: "35px", width: "530px" }}
        />
      </Box>
    );
  }

 
  if (selectedTransaction) {
    return (
      <Card sx={{ minWidth: 275 }}>
        {/* Mostrar la información completa de la transacción seleccionada */}
        {/* Por ejemplo: */}
        <CardContent>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1693a5" }} aria-label="">
          <Typography sx={{ fontSize: 13 }} color="white">#{selectedTransaction.id}</Typography>
          </Avatar>
        }
    
        title={selectedTransaction.description ? selectedTransaction.description : "Título predeterminado"}
        subheader={`Fecha: ${selectedTransaction.transactionDate.split('T')[0]} | Hora:${selectedTransaction.transactionDate.split('T')[1]} ` }

       
      />
      
        <Typography sx={{ fontSize: 14 }} color="WHITE" gutterBottom variant="h6">Id: {selectedTransaction.id}</Typography>
        
        <Typography variant="h6" component="div">
         Detalles: 
         
        </Typography>
        <Card >
        <Typography variant="body2"> <b>Monto:</b> {selectedTransaction.amount}</Typography>
        <Typography variant="body2"><b>Tipo:</b>  {selectedTransaction.type}</Typography>
        <Typography variant="body2"><b>Descripción:</b>  {selectedTransaction.description}</Typography>

        <Typography variant="body2"><b>Monto:</b>  {selectedTransaction.account.id}</Typography>
        
        </Card>

        </CardContent>
        <Button onClick={() => setSelectedTransaction(null)}>Cerrar</Button>
      </Card>
    );
  }

  return (
    <Grid container>
      <Grid item xs={10}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page + 1}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <List>
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onClick={() => handleCardClick(transaction)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}