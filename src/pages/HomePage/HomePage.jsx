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
  };

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
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
          />
          <ActivitiesCard handleClickPlazoFijo={handleClickPlazoFijo}  onChangeCurrency={handleCurrencyChange}  />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5} s={{}}>
          {clickedPF ? <PlazoFIjoCardList /> : <TransactionList currency={currency} />}
        </Grid>
      </Grid>
    </>
  );
}
