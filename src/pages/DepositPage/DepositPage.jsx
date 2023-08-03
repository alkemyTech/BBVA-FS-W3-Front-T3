import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GenericModal from "../../components/Modal/GenericModal";
import { Collapse, Grid, List, ListItem, ListItemText } from "@mui/material";

import "../TransaccionesPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionsApi from "../../api/transactionsApi";

export default function DepositPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate();
  const [transferData, setTransferData] = useState({
    amount: 0,
    currency: "ARS",
    description: "",
  });

  const initialValues = {
    monto: "",
    tipo: "",
    concepto: "",
  };

  const validationSchema = Yup.object().shape({
    monto: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    tipo: Yup.string().required("Campo requerido"),
    concepto: Yup.string()
      .required("Campo requerido")
      .max(25, "El concepto no debe ser mayor a 25 caracteres"),
  });

  const onSubmit = (values) => {
    setTransferData({
      amount: values.monto,
      currency: values.tipo,
      description: values.concepto,
    });
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
    formik.resetForm();
    setIsModalOpen(false);

    TransactionsApi.deposit({
      amount: transferData.amount,
      currency: transferData.currency,
      description: transferData.description,
    })
      .then(() => {
        formik.resetForm();
        setIsModalOpen(false);
        history("/inicio");
      })

      .catch(() => {
        formik.resetForm();
        setIsModalOpen(false);
      });
  };

  const handleModalCancel = () => {
    // Cerrar el modal sin realizar ninguna acción si se hace clic en "Cancelar"
    setIsModalOpen(false);
  };

  const [load, setLoad] = useState(false);

  setTimeout(() => {
    setLoad(true);
  }, 0);

  return (
    <Box className="transactionBox" backgroundColor="#EAEAEA">
      <Box className="formStyle">
        <Collapse in={load} timeout={1000}>
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "Helvetica",
              color: "#1693a5",
              textAlign: "center",
            }}
          >
            INGRESAR DINERO
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
            <TextField
              select
              label="Tipo"
              name="tipo"
              variant="filled"
              value={formik.values.tipo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.tipo && formik.errors.tipo)}
              helperText={
                formik.touched.tipo && formik.errors.tipo
                  ? formik.errors.tipo
                  : ""
              }
              fullWidth
              SelectProps={{
                style: inputStyle,
              }}
              InputLabelProps={{
                style: labelStyle,
              }}
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              <MenuItem value="ARS">ARS</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </TextField>
            <TextField
              label="Concepto"
              name="concepto"
              variant="filled"
              value={formik.values.concepto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.concepto && formik.errors.concepto)}
              helperText={
                formik.touched.concepto && formik.errors.concepto
                  ? formik.errors.concepto
                  : ""
              }
              type="text"
              inputProps={{ inputMode: "text" }}
              fullWidth
              InputProps={{
                style: inputStyle,
              }}
              InputLabelProps={{
                style: labelStyle,
              }}
              sx={{ marginBottom: "20px" }}
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </form>
        </Collapse>
      </Box>
      {isModalOpen && formik.isValid && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            title={"Ingreso de dinero a tu cuenta:"}
            content={
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Monto a acreditar:`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={5}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`${transferData.currency} ${transferData.amount}`}
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
