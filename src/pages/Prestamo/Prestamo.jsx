import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loan } from "../../api/loanApi";

import "../TransaccionesPage.css";

export default function PrestamoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulation, setSimulation] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    interestRate: 0,
  });
  const navigate = useNavigate();

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

  const onSubmit = (values) => {
    handleSimulation(values)
      .then((data) => {
        setSimulation({
          monthlyPayment: data.monthlyPayment,
          totalPayment: data.totalPayment,
          interestRate: data.interestRate,
        });
        setIsModalOpen(true);
      })
      .catch(() => {
        setIsModalOpen(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSimulation = (values) => {
    const { closingDate } = values;
    const fechaCierre = new Date(closingDate);
    const fechaActual = new Date();

    if (fechaActual > fechaCierre) {
      alert("La fecha de finalización debe ser mayor a la fecha actual.");
      return;
    }

    const mesesFaltantes =
      (fechaCierre.getFullYear() - fechaActual.getFullYear()) * 12 +
      (fechaCierre.getMonth() - fechaActual.getMonth());

    return Loan.simulate({
      amount: values.amount,
      term: mesesFaltantes,
    });
  };

  const handleModalAccept = () => {
    formik.resetForm();
    setIsModalOpen(false);

    navigate("/inicio");
  };

  const handleModalCancel = () => {
    // Cerrar el modal sin realizar ninguna acción si se hace clic en "Cancelar"
    setIsModalOpen(false);
  };

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  return (
    <Box className="transactionBox" backgroundColor="#EAEAEA">
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
          SIMULAR PRESTAMO
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="filled"
            label="Monto"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.amount && formik.errors.amount)}
            helperText={
              formik.touched.amount && formik.errors.amount
                ? formik.errors.amount
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
              name="closingDate"
              value={formik.values.closingDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!(formik.touched.closingDate && formik.errors.closingDate)
              }
              helperText={
                formik.touched.closingDate && formik.errors.closingDate
                  ? formik.errors.closingDate
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

                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <Typography>Pago mensual:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>{simulation.monthlyPayment}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Pago total:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>{simulation.totalPayment}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Interes:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>{simulation.interestRate}</Typography>
                  </Grid>
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
