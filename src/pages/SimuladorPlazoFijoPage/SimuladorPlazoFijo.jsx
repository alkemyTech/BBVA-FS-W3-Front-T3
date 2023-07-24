import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styled from "styled-components";
import { FixedTermApi } from "../../api/fixedTermApi.js";
import api from "../../api/axios.js";

import "../DepositPage/DepositPage.css";

const SimuladorPlazoFijo = () => {
  const PlazoFijoTitle = styled(Typography)(() => ({
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1693a5",
    textAlign: "center",
  }));

  const initialValues = {
    amount: "",
    closingDate: "",
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    closingDate: Yup.date().required("Campo requerido"),
  });

  const handleSimulation = (values) => {
    console.log(values);
    FixedTermApi.simulate({
      amount: values.amount,
      closingDate: values.closingDate,
    })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        alert("La simulación fue exitosa");
      })
      .catch((error) => {
        console.log(error);
        alert("La simulación falló");
      });
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSimulation}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Monto"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.amount && errors.amount)}
                helperText={
                  touched.amount && errors.amount ? errors.amount : ""
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
                name="closingDate"
                value={values.closingDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.closingDate && errors.closingDate)}
                helperText={
                  touched.closingDate && errors.closingDate
                    ? errors.closingDate
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
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default SimuladorPlazoFijo;
