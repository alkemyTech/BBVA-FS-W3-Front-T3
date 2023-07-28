import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import PlazoFijoCard from "./PlazoFijoCard";
import AccountsApi from "../../../api/accountsApi";

export default function PlazoFijoCardList() {
  const [fixedTerms, setFixedTerms] = useState([]);

  useEffect(() => {
    AccountsApi.getBalance()
      .then((data) => {
        setFixedTerms(data.fixedTerms);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={5}>
      {fixedTerms.map((fixedTerm) => (
        <Grid item xs={6} key={fixedTerm.id}>
          {fixedTerm && <PlazoFijoCard fixedTerm={fixedTerm} />}
        </Grid>
      ))}
    </Grid>
  );
}
