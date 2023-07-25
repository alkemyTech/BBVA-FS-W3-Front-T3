import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

import "./Prestamo.css";

export default function PrestamoPage() {
  const PrestamoTitle = styled(Typography)(() => ({
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontFamily: "Helvetica",
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
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  return (
    <Box className="prestamoBox">
      <Box className="prestamoFormStyle">
        <PrestamoTitle>PIDE TU PRESTAMO</PrestamoTitle>
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
    </Box>
  );
}
