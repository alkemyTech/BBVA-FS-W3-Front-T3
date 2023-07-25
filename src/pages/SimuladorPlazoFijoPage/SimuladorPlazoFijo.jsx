import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styled from "styled-components";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SimuladorPlazoFijo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PlazoFijoTitle = styled(Typography)(() => ({
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  }));

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

    for (let i = 0; i < mesesFaltantes; i++) {
      montoConInteres *= 1.05; // Calculamos el monto con el interés compuesto para cada mes
    }

    console.log("Monto con interés:", montoConInteres.toFixed(2));
    console.log("Meses faltantes para el cierre:", mesesFaltantes);

    // Actualizamos el estado con el mensaje a mostrar
    setMessage(
      `Monto con interés: $${montoConInteres.toFixed(
        2
      )}, Meses faltantes para el cierre: ${mesesFaltantes}`
    );

    setSubmitted(true);

    setIsModalOpen(true);

  };
  const handleModalAccept = () => {
    console.log("Formulario enviado:", formik.values);

    formik.resetForm();
    setIsModalOpen(false);
    setSubmitted(true);

    history("/inicio");

    toast.success("Plazo fijo realizado con éxito!", {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const formStyle = {
    backgroundColor: "#45b5c4",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const messageStyle = {
    backgroundColor: "#7ececa",
    color: "black",
    padding: "10px",
    borderRadius: "4px",
    marginTop: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#c7ede8",
    color: "black",
    marginTop: "20px",
  };

  const inputStyle = {
    backgroundColor: "#c7ede8",
    color: "black",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  return (
    <CenteredContainer>
      <Box style={formStyle}>
        <PlazoFijoTitle variant="h4" sx={{ fontFamily: "Helvetica" }}>
          Simulador Plazo Fijo
        </PlazoFijoTitle>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
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
              type="text"
              inputProps={{ inputMode: "numeric" }}
              InputProps={{
                style: inputStyle,
              }}
              InputLabelProps={{
                style: labelStyle,
              }}
              fullWidth
            />
          </div>
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
          <Button
            variant="contained"
            style={buttonStyle}
            type="submit"
            fullWidth
          >
            Enviar
          </Button>
        </form>
        {submitted &&
          message && ( // Mostramos el mensaje si hay uno y si el formulario ha sido enviado
            <Typography variant="body1" style={messageStyle}>
              {message}
            </Typography>
          )}
      </Box>
      {isModalOpen && formik.isValid && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            content={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" className="tittle">
                    Confirmacion de plazo fijo:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Monto inicial de:`} />
                      <ListItemText primary={"$100000"} className="name" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Hasta el dia: `} />
                      <ListItemText primary={"16/09/2023"} className="name" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" className="tittle2">
                    Monto a recibir al finalizar:
                  </Typography>
                  <List className="monto">
                    <ListItem>
                      <ListItemText primary={`654564164564`} />
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
    </CenteredContainer>
  );
};
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 5rem;
`;

export default SimuladorPlazoFijo;
