/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";
import { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";

export default function ActivitiesCard({
  handleClickPlazoFijo,
  handleClickInversiones,
  onShowAllTransactions,
}) {
  const [selectedCurrency, setSelectedCurrency] = useState(""); // Estado para la moneda seleccionada

  const handleShowAllTransactions = () => {
    setSelectedCurrency(""); // Reiniciar el filtro de moneda seleccionado
    onShowAllTransactions(); // Comunicar al componente padre (HomePage) que se deben mostrar todas las transacciones
  };

  return (
    <Card
      sx={{
        width: "105%",
        marginTop: "10px",
        boxShadow: "5px 5px 15px #CFCFCF",
      }}
    >
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
          <CardActionArea onClick={handleShowAllTransactions}>
            <ListItem>
              <ListItemAvatar>
                <PetsIcon sx={{ color: "#1693a5" }} />
              </ListItemAvatar>
              <ListItemText primary="Todos mis movimientos" />
            </ListItem>
          </CardActionArea>
          <CardActionArea onClick={handleClickInversiones}>
            <ListItem>
              <ListItemAvatar>
                <PetsIcon sx={{ color: "#1693a5" }} />
              </ListItemAvatar>
              <ListItemText primary="Inversiones" />
            </ListItem>
          </CardActionArea>
          <CardActionArea onClick={handleClickPlazoFijo}>
            <ListItem>
              <ListItemAvatar>
                <PetsIcon sx={{ color: "#1693a5" }} />
              </ListItemAvatar>
              <ListItemText primary="Plazos Fijos" />
            </ListItem>
          </CardActionArea>
        </List>
      </CardContent>
    </Card>
  );
}
