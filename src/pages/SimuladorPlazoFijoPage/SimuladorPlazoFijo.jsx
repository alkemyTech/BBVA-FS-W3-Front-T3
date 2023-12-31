import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FixedTermApi } from "../../api/fixedTermApi.js";

import "../TransaccionesPage.css";

const formatNumberWithCommas = (number) => {
  return new Intl.NumberFormat("es-AR").format(number);
};

const SimuladorPlazoFijo = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulation, setSimulation] = useState({
    amount: 0,
    interest: 0.002,
    total: 0,
    closingDate: "",
    creationDate: new Date().toLocaleDateString(),
  });

  const initialValues = {
    amount: "",
    closingDate: "",
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    closingDate: Yup.date()
      .min(
        new Date(),
        "La fecha de finalización debe ser mayor a la fecha actual.",
      )
      .required("Campo requerido"),
  });

  const onSubmit = (values) => {
    handleSimulation(values)
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
    return FixedTermApi.simulate({
      amount: values.amount,
      closingDate: values.closingDate,
    });
  };

  const handleModalAccept = () => {
    FixedTermApi.create({
      amount: simulation.amount,
      closingDate: simulation.closingDate,
    })
      .then(() => {
        navigate("/inicio");
      })
      .catch(() => {
        formik.resetForm();
        setIsModalOpen(false);
      });
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
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
          PLAZO FIJO
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
            value={formik.values.closingDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.closingDate && formik.errors.closingDate)}
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
            sx={{ paddingTop: 1.3, marginBottom: "20px" }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </form>
      </Box>
      {isModalOpen && formik.isValid && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            title={"Confirmación de Plazo Fijo"}
            content={
              <Grid
                container
                spacing={2}
                sx={{ placeItems: "center", maxWidth: "100%" }}
              >
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Monto Inicial:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      $ {formatNumberWithCommas(simulation.amount)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Inicio:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      {simulation.creationDate}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Cierre:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      {simulation.closingDate}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Interés:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        color: "#1693a5",
                      }}
                      gutterBottom
                    >
                      {simulation.interest * 100} %
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      Total a acreditar:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        color: "#1693a5",
                      }}
                      gutterBottom
                    >
                      $ {formatNumberWithCommas(simulation.total)}
                    </Typography>
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
};
export default SimuladorPlazoFijo;
