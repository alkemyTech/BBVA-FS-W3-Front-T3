import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import GenericModal from "../../Modal/GenericModal.jsx";
import { useState } from "react";

export default function PlazoFijoCard({ fixedTerm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalAccept = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader
        title={`${fixedTerm.account.currency} $${fixedTerm.amount}`}
        sx={{
          textAlign: "center",
          backgroundColor: "#1ea49d",
          color: "white",
        }}
      />
      <CardContent>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "black" }}>
              CBU
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="text.secondary"
              align="center"
            >
              {fixedTerm.account.cbu}
            </Typography>
            <Divider sx={{ color: "black", mt: 1, mb: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom sx={{ color: "black" }}>
              INICIO:{" "}
            </Typography>
            <Typography color="text.secondary">
              {fixedTerm.creationDate.split("T")[0]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>CIERRE: </Typography>
            <Typography gutterBottom color="#1ea49d">
              {fixedTerm.closingDate.split("T")[0]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Divider sx={{ color: "black", mt: 1, mb: 1 }} />
            <Typography gutterBottom> INTERESES: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Divider sx={{ color: "black", mt: 1, mb: 1 }} />
            <Typography color="#1ea49d">{fixedTerm.interest * 100}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button error sx={{ color: "#ff2c69" }} onClick={handleModalOpen}>
          Cancelar
        </Button>
      </CardActions>
      {isModalOpen && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            title={"Cancelar Plazo Fijo"}
            content={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6">
                    Se cancelará el plazo fijo de:
                  </Typography>
                  <Typography gutterBottom variant="body1" align="center">
                    {fixedTerm.account.currency} ${fixedTerm.amount}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6">
                    Monto a rescatar:
                  </Typography>
                  <Typography gutterBottom variant="body1" align="center">
                    {fixedTerm.account.currency} {fixedTerm.amount}
                  </Typography>
                  <Typography variant="body2" color="#ff2c69">
                    No se acreditarán los intereses
                  </Typography>
                </Grid>
              </Grid>
            }
            onAccept={handleModalAccept}
            onClose={handleModalCancel}
          />
        </div>
      )}
    </Card>
  );
}
