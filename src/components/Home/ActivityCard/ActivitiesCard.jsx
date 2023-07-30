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
import PetsIcon from '@mui/icons-material/Pets';

export default function ActivitiesCard({ handleClickPlazoFijo, onChangeCurrency,onShowAllTransactions }) {
  const [selectedCurrency, setSelectedCurrency] = useState(""); // Estado para la moneda seleccionada



  const handleShowAllTransactions = () => {
    setSelectedCurrency(""); // Reiniciar el filtro de moneda seleccionado
    onShowAllTransactions(); // Comunicar al componente padre (HomePage) que se deben mostrar todas las transacciones
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
          <CardActionArea onClick={handleShowAllTransactions}>
            <ListItem>
              <ListItemAvatar>
              <PetsIcon/> 
              </ListItemAvatar>
              <ListItemText
                primary="Todos mis movimientos"
            
              />
            </ListItem>
          </CardActionArea>
          <CardActionArea>
            <ListItem>
              <ListItemAvatar>
                 <PetsIcon/> 
              </ListItemAvatar>
              <ListItemText primary="Inversiones" />
            </ListItem>
          </CardActionArea>
          <CardActionArea onClick={handleClickPlazoFijo}>
            <ListItem>
              <ListItemAvatar>
              <PetsIcon/> 
              </ListItemAvatar>
              <ListItemText primary="Plazos Fijos" />
            </ListItem>
          </CardActionArea>
        </List>
      </CardContent>
    </Card>
  );
}
