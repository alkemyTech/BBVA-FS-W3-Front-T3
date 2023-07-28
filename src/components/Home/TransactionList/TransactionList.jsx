import { Box, Grid, List, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi.js";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Estado para la página actual
  const [pageSize, setPageSize] = useState(10); // Estado para el tamaño de página
  const [totalPages, setTotalPages] = useState(0); // Estado para el número total de páginas
  const user = useSelector((state) => state.user);

  // Función para actualizar la lista de transacciones cuando cambia la página
  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1); // Restamos 1 porque el componente Pagination cuenta las páginas desde 1, pero necesitamos contar desde 0 para la API.
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
    TransactionsApi.getTransactionsByUserId(user.id, page, pageSize)
      .then((data) => {
        console.log(data);
        setTransactions(data?._embedded?.transactionList || []);
        setTotalPages(data?.page?.totalPages || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [user, page, pageSize]);

  if (loading) {
    return (
      <Box sx={{ width: 500 }}>
       <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
       <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
       <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
        <Skeleton animation="wave" sx={{margin:"1px", padding:"35px", width:"530px"}} />
      </Box>
    );
    }
  return (
    <Grid container sx={{}}>
      <Grid item xs={10}>
      <Stack spacing={2}>
          <Pagination
            count={totalPages} // Total de páginas
            page={page + 1} // Página actual
            onChange={handlePageChange} // Función para manejar cambio de página
          />
        </Stack>
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
