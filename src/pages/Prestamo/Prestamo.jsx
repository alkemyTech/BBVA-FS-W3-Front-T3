import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid, List, ListItem, ListItemText, formGroupClasses } from "@mui/material";
import { toast } from "react-toastify";

import "./Prestamo.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loan } from "../../api/loanApi";

export default function PrestamoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulation, setSimulation] = useState({
    amount: 0,
    interest: 0.002,
    total: 0,
    closingDate: "",
    creationDate: new Date().toLocaleDateString(),
  })
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
    const { amount, closingDate } = values;
    const fechaCierre = new Date(closingDate);
    const fechaActual = new Date();

    if (fechaActual > fechaCierre) {
      alert("La fecha de finalización debe ser mayor a la fecha actual.");
      return;
    }

    let montoConInteres = parseFloat(amount); // Convertimos el monto a número

    const mesesFaltantes =
      (fechaCierre.getFullYear() - fechaActual.getFullYear()) * 12 +
      (fechaCierre.getMonth() - fechaActual.getMonth());

    handleSimulation({amount:values.amount, term:mesesFaltantes})
      .then((data) => {
        setSimulation({
          amount: data.amount,
          interest: data.interest,
          total: data.total,
          closingDate: data.closingDate,
          creationDate: data.creationDate,
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
    return Loan.simulate({
      amount: values.amount,
      closingDate: values.closingDate,
    });
  };

  const handleModalAccept = () => {

    formik.resetForm();
    setIsModalOpen(false);

    navigate("/inicio");

    ;
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
    <Box className="prestamoBox">
      <Box className="prestamoFormStyle">
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
                !!(
                  formik.touched.closingDate &&
                  formik.errors.closingDate
                )
              }
              helperText={
                formik.touched.closingDate &&
                formik.errors.closingDate
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
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Monto a acreditar:`} />
                      <ListItemText
                        primary={` ${simulation.amount}`}
                        className="name"
                      />
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
