import { Box, Grid, List, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TransactionList({currency}) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Estado para la carga inicial
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const user = useSelector((state) => state.user);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      TransactionsApi.getTransactionsByUserId(user.id, page, pageSize)
        .then((data) => {
          console.log(data);
          // Filtrar las transacciones según la moneda seleccionada
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
    }, 500);
    return () => clearTimeout(timer);
  }, [user, page, pageSize, currency, initialLoading]);

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

  return (
    <Grid container sx={{}}>
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
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
