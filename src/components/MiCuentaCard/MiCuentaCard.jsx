import Card from "@mui/material/Card";
import { CardActionArea, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {CardHeader} from "@mui/material";

export default function MiCuentaCard(props) {
  const navigate = useNavigate();
  var title = props.title;
  var description = props.description;
  var image = props.image;
  var alt = props.alt;
  var action = props.action;
  var cbu = props.cvu;
  var transactionLimit = props.transactionLimit;
  var balance = props.balance;

  const handleClickAction = () => {
    navigate(props.actionPath);
  };

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: "#1693a5" }}>
        <CardHeader title ={title}  sx={{ fontSize: "1.5rem", textAlign: "center", color: "white" }}/>
        <CardMedia component="img" alt={alt} image={image} />
        <CardContent cbu ={cbu} />
        CBU = {cbu}
        <CardContent transactionLimit ={transactionLimit} />
        Limite de Transacción:  {transactionLimit}
        <CardContent balance ={balance} />
        Balance: {balance}
    </Card>
  );
}
