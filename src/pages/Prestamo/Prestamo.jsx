import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../TransaccionesPage.css";

export default function PrestamoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    monto: "",
    fechaFinalizacion: "",
  };

  const validationSchema = Yup.object().shape({
    monto: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    fechaFinalizacion: Yup.date().required("Campo requerido"),
  });

  const onSubmit = (values) => {
    const { monto, fechaFinalizacion } = values;
    const fechaCierre = new Date(fechaFinalizacion);
    const fechaActual = new Date();

    if (fechaActual > fechaCierre) {
      alert("La fecha de finalización debe ser mayor a la fecha actual.");
      return;
    }

    let montoConInteres = parseFloat(monto); // Convertimos el monto a número

    const mesesFaltantes =
      (fechaCierre.getFullYear() - fechaActual.getFullYear()) * 12 +
      (fechaCierre.getMonth() - fechaActual.getMonth());

    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "bold",
  };
  const handleModalAccept = () => {
    console.log("Formulario enviado:", formik.values);

    formik.resetForm();
    setIsModalOpen(false);

    navigate("/inicio");

    toast.success("Deposito realizado con éxito!", {
      position: "top-center",
      autoClose: 3000, // Duración de la notificación (en milisegundos)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleModalCancel = () => {
    // Cerrar el modal sin realizar ninguna acción si se hace clic en "Cancelar"
    setIsModalOpen(false);
  };

  return (
    <Box className="transactionBox">
      <Box className="formStyle">
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "Helvetica",
            color: "#1693a5",
            textAlign: "center",
          }}
        >
          PIDE TU PRESTAMO
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="filled"
            label="Monto"
            name="monto"
            value={formik.values.monto}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.monto && formik.errors.monto)}
            helperText={
              formik.touched.monto && formik.errors.monto
                ? formik.errors.monto
                : ""
            }
            fullWidth
            InputProps={{
              style: inputStyle,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            InputLabelProps={{
              style: labelStyle,
            }}
            sx={{ marginBottom: "20px" }}
          />
          <div style={{ marginBottom: "20px" }}>
            <TextField
              variant="filled"
              label="Fecha de Finalización"
              name="fechaFinalizacion"
              value={formik.values.fechaFinalizacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!(
                  formik.touched.fechaFinalizacion &&
                  formik.errors.fechaFinalizacion
                )
              }
              helperText={
                formik.touched.fechaFinalizacion &&
                formik.errors.fechaFinalizacion
                  ? formik.errors.fechaFinalizacion
                  : ""
              }
              type="date"
              fullWidth
              InputProps={{
                style: inputStyle,
              }}
              InputLabelProps={{
                style: labelStyle,
              }}
              sx={{ paddingTop: 1.3 }}
            />
          </div>
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </form>
      </Box>
      {isModalOpen && formik.isValid && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            content={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" className="tittle">
                    Realizaras un prestamo personal:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Monto a acreditar:`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            }
            onAccept={handleModalAccept}
            onClose={handleModalCancel}
          />
        </div>
      )}
    </Box>
  );
}
