import { useDispatch, useSelector } from "react-redux";
import {Grid,Box} from "@mui/material";
import { useEffect,useState } from "react";
import { addAccountArs} from "../../redux/accountArsSlice";
import { addAccountUsd } from "../../redux/accountUsdSlice";
import UserInfoCard from "../../components/Home/UserInfoCard/UserInfoCard";
import ActivitiesCard from "../../components/Home/ActivityCard/ActivitiesCard";
import TransactionList from "../../components/Home/TransactionList/TransactionList";
import AccountsApi from "../../api/accountsApi";



export default function HomePage() {
  const [currency, setCurrency] = useState("ARS");
  const accountARS = useSelector((state) => state.accountArs);
  const accountUSD = useSelector((state) => state.accountUsd);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


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

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "89vh",
          alignItems: "center",
          placeItems: "center",
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
          <ActivitiesCard />
        </Grid>
        <Grid item xs={7}>
          <TransactionList />
        </Grid>
      </Grid>
    </>
  );
}
