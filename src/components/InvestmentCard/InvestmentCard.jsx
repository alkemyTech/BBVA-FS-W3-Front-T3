import Card from "@mui/material/Card";
import { Box, CardActionArea, CardMedia, Collapse, Grow } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function InvestmentCard(props) {
  const navigate = useNavigate();
  var title = props.title;
  var description = props.description;
  var image = props.image;
  var alt = props.alt;
  var action = props.action;

  const handleClickAction = () => {
    navigate(props.actionPath);
  };

  const [load, setLoad] = useState(false);

  setTimeout(() => {
    setLoad(true);
  }, 0);

  return (
    <Box>
      <Grow in={load} timeout={1100}>
        <Card
          sx={{
            maxWidth: 400,
            backgroundColor: "#1693a5",
            boxShadow: "30px 15px 30px gray",
          }}
        >
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
      </Grow>
    </Box>
  );
}
