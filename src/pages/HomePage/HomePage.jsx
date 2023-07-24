import {Grid} from "@mui/material";
import UserCard from "../../components/HomeCards/UserCard/UserCard.jsx"
import "../InvestmentPage/InvestmentPage.css";

export default function Home() {
    return (
        <Grid container direction="row" spacing={2} className="grid">
            <Grid item xs={2} />
            <Grid item xs={3}>
                <UserCard />
            </Grid>
            <Grid item xs={3}>
                <UserCard />
            </Grid>
        </Grid>
    )
}