import Card from "@mui/material/Card";
import { CardActionArea, CardMedia, CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function InvestmentCard(props) {
  var title = props.title;
  var description = props.description;
  var image = props.image;
  var alt = props.alt;
  var action = props.action;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" alt={alt} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined">
            Simular
          </Button>
          <Button size="small" variant="contained">
            {action}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
