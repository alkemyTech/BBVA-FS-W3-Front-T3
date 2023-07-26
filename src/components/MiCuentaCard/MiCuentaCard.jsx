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
    <Card sx={{ maxWidth: 400, backgroundColor: "white", boxShadow:"3px 2px 12px 5px #7ececa"}}>
             <CardHeader
        title={
          <Typography
            
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
              fontWeight: "bold",
              textAlign: "center",
           }}
          >
          CBU <Typography variant = "h6"> {cbu} </Typography>
          </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
         Limite de transaccion <Typography variant = "h6"> {transactionLimit} </Typography>
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
         Balance <Typography variant = "h6"> {balance} </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
