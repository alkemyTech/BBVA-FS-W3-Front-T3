import React from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function TransactionList() {
  //lógica para las transaccionesApi daltante

  function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 500,
        maxHeight: 600,
        marginTop: "70px",
        marginLeft: "50px",
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
          <Typography variant="h5" component="div">
            Transacciones recientes
          </Typography>
        </Grid>
        <List>
          {generate(
            <ListItem>
              <ListItemText primary="Transaccion " />
            </ListItem>,
          )}
        </List>
      </CardContent>
    </Card>
  );
}
