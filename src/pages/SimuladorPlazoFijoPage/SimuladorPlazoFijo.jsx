import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styled from "styled-components";

import "../DepositPage/DepositPage.css";

const SimuladorPlazoFijo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const PlazoFijoTitle = styled(Typography)(() => ({
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1693a5",
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
        2,
      )}, Meses faltantes para el cierre: ${mesesFaltantes}`,
    );

    setSubmitted(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  return (
    <Box className="transactionBox">
      <Box className="formStyle">
        <PlazoFijoTitle>Plazo Fijo</PlazoFijoTitle>
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
            type="text"
            inputProps={{ inputMode: "numeric" }}
            InputProps={{
              style: inputStyle,
            }}
            InputLabelProps={{
              style: labelStyle,
            }}
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
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
            sx={{ paddingTop: 1.3, marginBottom: "20px" }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default SimuladorPlazoFijo;
