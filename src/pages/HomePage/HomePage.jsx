import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { addAccountArs } from "../../redux/accountArsSlice";
import { addAccountUsd } from "../../redux/accountUsdSlice";
import UserInfoCard from "../../components/Home/UserInfoCard/UserInfoCard";
import ActivitiesCard from "../../components/Home/ActivityCard/ActivitiesCard";
import TransactionList from "../../components/Home/TransactionList/TransactionList";
import AccountsApi from "../../api/accountsApi";
import PlazoFIjoCardList from "../../components/Home/PlazoFijoList/PlazoFIjoCardList";

export default function HomePage() {
  const [currency, setCurrency] = useState("ARS");
  const [clickedPF, setClickedPF] = useState(false);
  const accountARS = useSelector((state) => state.accountArs);
  const accountUSD = useSelector((state) => state.accountUsd);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showAllTransactions, setShowAllTransactions] = useState(false); // Nuevo estado para mostrar todas las transacciones

  const handleClickPlazoFijo = () => {
    setClickedPF(true);
  };

  useEffect(() => {
    AccountsApi.accountInfo(user.id).then((response) => {
      response.data.map((account) => {
        if (account.currency === "ARS") {
          dispatch(addAccountArs(account));
        } else {
          dispatch(addAccountUsd(account));
        }
      });
    });
  }, [dispatch, user]);

  const handleForward = () => {
    setCurrency(currency === "ARS" ? "USD" : "ARS");
    setShowAllTransactions(false); // Cerrar la sección de todas las transacciones si estaba abierta
  };

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
    setShowAllTransactions(false); // Cerrar la sección de todas las transacciones si estaba abierta
  };

  const handleShowAllTransactions = () => {
    setCurrency(""); // Reiniciar el filtro de moneda seleccionado
    setClickedPF(false); // Cerrar la sección de plazos fijos si estaba abierta
    setShowAllTransactions(true); // Mostrar todas las transacciones
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{
          marginTop: "60px",
          marginBottom: "60px",
          placeItems: "top",
          backgroundColor: "#EAEAEA",
          minHeight: "87vh",
          minWidth: "101.5vw",
        }}
      >
        <Grid item xs={1} />
        <Grid item xs={1} />

        <Grid item xs={2}>
          <UserInfoCard
            currency={currency}
            accountARS={accountARS}
            accountUSD={accountUSD}
            user={user}
            handleForward={handleForward}
            onChangeCurrency={handleCurrencyChange} 
          />
          <ActivitiesCard handleClickPlazoFijo={handleClickPlazoFijo}
                          onChangeCurrency={handleCurrencyChange} 
                          onShowAllTransactions={handleShowAllTransactions}  /> 
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5} s={{}}>
          {clickedPF ? <PlazoFIjoCardList /> : <TransactionList currency={currency} showAllTransactions={showAllTransactions} />}
        </Grid>
      </Grid>
    </>
  );
}
