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

  const handleClickSimular = () => {
    navigate(props.simulatePath);
  };

  const handleClickAction = () => {
    console.log(props);
    navigate(props.actionPath);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClickAction}>
        <CardMedia component="img" alt={alt} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" onClick={handleClickSimular}>
          Simular
        </Button>
        <Button size="small" variant="contained" onClick={handleClickAction}>
          {action}
        </Button>
      </CardActions>
    </Card>
  );
}
