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
import { useState } from "react";

export default function ActivitiesCard({ handleClickPlazoFijo, onChangeCurrency  }) {
  const [selectedCurrency, setSelectedCurrency] = useState(""); // Estado para la moneda seleccionada

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onChangeCurrency(currency); // Comunicar el cambio de moneda al componente padre (HomePage)
  };
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
          <CardActionArea onClick={() => handleCurrencyChange("ARS")}>
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
          <CardActionArea onClick={() => handleCurrencyChange("USD")}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Transacciones en Dolares" />
            </ListItem>
          </CardActionArea>
          <CardActionArea onClick={handleClickPlazoFijo}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/src/assets/huellaCat.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Plazos Fijos" />
            </ListItem>
          </CardActionArea>
        </List>
      </CardContent>
    </Card>
  );
}
