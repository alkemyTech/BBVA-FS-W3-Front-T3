import Card from "@mui/material/Card";
import { CardActionArea, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {CardHeader} from "@mui/material";
import Button from "@mui/material/Button";

export default function MiCuentaCard(props) {
  const navigate = useNavigate();
  var title = props.title;
  var description = props.description;
  var image = props.image;
  var alt = props.alt;
  var action = props.action;
  var cbu = props.cbu;
  var transactionLimit = props.transactionLimit;
  var balance = props.balance;

  const handleClickAction = () => {
    navigate(props.actionPath);
  };

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: "white" }}>
             <CardHeader
        title={
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              textAlign: "center",
              color: "#1693a5",
              fontWeight: "bold", 
            }}
          >
            {title}
          </Typography>
        }
      />
        <CardMedia component="img" alt={alt} image={image} />
        <CardContent>
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "black",
           }}
          >
          CBU = {cbu}
          </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          Limite de Transacción: {transactionLimit}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          Balance: {balance}
        </Typography>
      </CardContent>
    </Card>
  );
}
