/* eslint-disable react/prop-types */
import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const colors = {
  INCOME: "#1ea49d",
  PAYMENT: "#ff2c69",
  DEPOSIT: "#cbe65b",
};

const icons = {
  INCOME: (
    <AddCircleIcon
      fontSize="large"
      sx={{
        color: colors.INCOME,
      }}
    />
  ),
  PAYMENT: (
    <RemoveCircleIcon
      fontSize="large"
      sx={{
        color: colors.PAYMENT,
      }}
    />
  ),
  DEPOSIT: (
    <DownloadForOfflineIcon
      fontSize="large"
      sx={{
        color: colors.DEPOSIT,
      }}
    />
  ),
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export default function TranscationCard({ transaction, onClick  }) {
  const { type, amount, transactionDate } = transaction;
  const currency = transaction.account.currency;
  const date = formatDate(transactionDate.split("T")[0]);
  return (
    <Card onClick={onClick} 
      sx={{
        marginTop: "10px",
        width: "100%",
      }}
    >
      <CardActionArea>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            placeItems: "center",
            pl: 1,
            pr: 1,
          }}
        >
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {icons[type]}
            <Typography paddingLeft={"10px"}>{type}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>{`${currency}`}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <CardContent>
              <Typography
                align="center"
                color={
                  type === "PAYMENT" ? colors["PAYMENT"] : colors["INCOME"]
                }
                sx={{ letterSpacing: "0.2rem" }}
              >
                {`$${amount}`}
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignContent: "center",
            }}
          >
            <Typography align="center">{date}</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
