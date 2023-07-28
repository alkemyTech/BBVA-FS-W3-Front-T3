import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";

export default function ActivitiesCard() {
  return (
    <Card sx={{ width: "107%", marginTop: "10px" }}>
      <CardContent>
        <Grid
          sx={{
            backgroundColor: "#E9FEFA",
            margin: -2,
            padding: 2,
            marginBottom: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Actividad
          </Typography>
        </Grid>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <CardActionArea>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Transacciones en Pesos"
                secondary="actividad en $ realizada"
              />
            </ListItem>
          </CardActionArea>
          <CardActionArea>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Transacciones en Dolares" />
            </ListItem>
          </CardActionArea>
          <CardActionArea>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Depositos realizados" />
            </ListItem>
          </CardActionArea>
        </List>
      </CardContent>
    </Card>
  );
}
