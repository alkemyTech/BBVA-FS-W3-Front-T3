import Card from "@mui/material/Card";
import { CardActionArea, CardMedia, CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function InvestmentCard(props) {
  const navigate = useNavigate();
  var title = props.title;
  var description = props.description;
  var image = props.image;
  var alt = props.alt;
  var action = props.action;

  const handleClickAction = () => {
    console.log(props);
    navigate(props.actionPath);
  };

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: "#1693a5" }}>
      <CardActionArea onClick={handleClickAction}>
        <CardMedia component="img" alt={alt} image={image} />
        <CardContent>
          <Typography
            gutterBottom
            sx={{ fontSize: "1.5rem", textAlign: "center", color: "white" }}
          >
            {title.toUpperCase()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
