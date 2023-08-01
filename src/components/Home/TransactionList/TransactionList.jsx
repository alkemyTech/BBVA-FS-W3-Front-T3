/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../TransactionList/TransactionCard.jsx";
import TransactionsApi from "../../../api/transactionsApi.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "../../Modal/EditModal.jsx";
import TransactionBasicMenu from "./TransactionBasicMenu.jsx";


export default function TransactionList({ currency, showAllTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const user = useSelector((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [orderType, setOrderType] = useState("desc");

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleOrderChange = (order) => {
    setOrderType(order);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mostrar todas las transacciones sin filtrar si showAllTransactions es true
      if (showAllTransactions) {
        TransactionsApi.getTransactionsByUserId(
          user.id,
          page,
          pageSize,
          orderType,
        )
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
        TransactionsApi.getTransactionsByUserId(
          user.id,
          page,
          pageSize,
          orderType,
          currency,
        )
          .then((data) => {
            const filteredTransactions = data?._embedded?.transactionList;
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
  }, [
    user,
    page,
    pageSize,
    currency,
    initialLoading,
    showAllTransactions,
    selectedTransaction,
    orderType,
  ]);

  if (initialLoading) {
    const numberOfSkeletons = 8;
    const skeletonElements = Array.from(
      { length: numberOfSkeletons },
      (_, index) => (
        <Skeleton
          key={index}
          animation="wave"
          sx={{ margin: "1px", padding: "35px", maxWidth: "530px" }}
        />
      ),
    );

    return <Box sx={{ width: 500 }}>{skeletonElements}</Box>;
  }
  const handleEditClick = (description) => {
    setEditedDescription(description);
    setIsEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveDescription = (editedDescription) => {
    console.log("editedDescription:", editedDescription);
    TransactionsApi.patchTransactionDescription(
      selectedTransaction.id,
      editedDescription,
    )
      .then((response) => {
        console.log("response:", response);
        setSelectedTransaction({
          ...selectedTransaction,
          description: editedDescription,
        });
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  if (selectedTransaction) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#1693a5" }} aria-label="">
                <Typography sx={{ fontSize: 13 }} color="white">
                  #{selectedTransaction.id}
                </Typography>
              </Avatar>
            }
            action={
              <IconButton
                aria-label="settings"
                onClick={() => handleEditClick(selectedTransaction.description)}
              >
                <EditIcon />
              </IconButton>
            }
            title={
              selectedTransaction.description
                ? selectedTransaction.description
                : "Título predeterminado"
            }
            subheader={`Fecha: ${
              selectedTransaction.transactionDate.split("T")[0]
            } | Hora: ${selectedTransaction.transactionDate.split("T")[1]} `}
          />

          <Grid container spacing={2}>
            <Grid item xs={1.2} />
            <Grid item xs={3}>
              <Typography variant="body2">
                <b>Monto:</b>
              </Typography>
              <Typography variant="body2">
                <b>Tipo:</b>
              </Typography>
              <Typography variant="body2">
                <b>Descripción:</b>
              </Typography>
              <Typography variant="body2">
                <b>CBU destino:</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">
                {selectedTransaction.amount}{" "}
                {selectedTransaction.account.currency}
              </Typography>
              <Typography variant="body2">
                {selectedTransaction.type}
              </Typography>
              <Typography variant="body2">
                {selectedTransaction.description}
              </Typography>
              <Typography variant="body2">
                {selectedTransaction.account.cbu}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Button onClick={() => setSelectedTransaction(null)}>Cerrar</Button>
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveDescription}
          currentDescription={selectedTransaction.description}
          label={"Nueva Descripción"}
          title={"Descripción"}
        />
      </Card>
    );
  }

  return (
    <Grid container>
      {transactions ? (
        <>
          <Grid item xs={10}>
            <Stack spacing={3}>
              <Pagination
                count={totalPages}
                page={page + 1}
                color="primary"
                onChange={handlePageChange}
              />
            </Stack>
          </Grid>
      <Grid item xs={1}>
        <TransactionBasicMenu onOrderChange={handleOrderChange} />
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
        </>
      ) : (
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center" sx={{}} >
              
                <img 
              
                  className="img-fluid"
                  src="/src/assets/SleepCat.png"
                  width="100%"
                  alt="Un gato durmiendo"
                />
              
            </Box>
          </Grid>

      )}
    </Grid>
  );
}
