import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styled from "styled-components";
import "./TransferenciaPage.css";
import GenericModal from "../../components/Modal/GenericModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import "../../components/Modal/Modal.css";

import AccountsApi from "../../api/accountsApi.js";

const Transferencia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState({ firstName: '', lastName: '', email: ''});
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [transferData, setTransferData] = useState({});

  const TranferenciaTitle = styled(Typography)(() => ({
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: "#1693a5",
    textAlign: "center",
  }));

  const initialValues = {
    cbu: "",
    monto: "",
    moneda: "",
    concepto: "",
  };

  const validationSchema = Yup.object().shape({
    cbu: Yup.number()
      .positive("La cuenta debe ser un número positivo")
      .required("Campo requerido"),
    monto: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    moneda: Yup.string().required("Campo requerido"),
    concepto: Yup.string().required("Campo requerido"),
  });

  const validateCbu = (value) => {
    if (value.length === 22){
      console.log("llamando api", value)
      AccountsApi.getAccountByCbu(value)
          .then((data) => {
            console.log("data", data)
            setDestinationInfo(data.user);
          })
      // loader
    }
    setDestinationInfo({ firstName: '', lastName: '', email: ''})
  }

  const onSubmit = (values) => {
    //harcodeo de datos
    setUserData({
      name: "Carlitos Tevez", // Reemplaza por el nombre y apellido del usuario
      cbu: "0568861256004983210586205", // Reemplaza por el CBU obtenido de la cuenta asociada al usuario
    });

    setTransferData({
      monto: values.monto,
      tipo: values.tipo === "ARS" ? "$" : "u$d",
    });

    setIsModalOpen(true);
  };

  const handleModalAccept = () => {
    console.log("Formulario enviado:", formik.values);

    formik.resetForm();
    setIsModalOpen(false);

    navigate("/inicio");

    toast.success("Transferencia realizada con éxito!", {
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

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  return (
    <Box className="tansferenciaBox">
      <Box className="tansferenciaformStyle">
        <TranferenciaTitle>TRANSFERENCIA</TranferenciaTitle>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="CBU"
            name="cbu"
            variant="filled"
            value={formik.values.cbu}
            onChange={(e) => {
              formik.handleChange(e);
              validateCbu(e.target.value);
            }}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.cbu && formik.errors.cbu)}
            helperText={
              formik.touched.cbu && formik.errors.cbu ? formik.errors.cbu : `${destinationInfo.firstName} ${destinationInfo.lastName}`
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
            label="Moneda"
            name="moneda"
            variant="filled"
            value={formik.values.moneda}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.moneda && formik.errors.moneda)}
            helperText={
              formik.touched.moneda && formik.errors.moneda
                ? formik.errors.moneda
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
      </Box>
      {isModalOpen && formik.isValid && (
        <div className="boxModal">
          <GenericModal
            open={isModalOpen}
            content={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" className="tittle">
                    Usted realizará una transferencia a:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Nombre y Apellido del usuario:`}
                      />
                      <ListItemText
                        primary={`${userData.name || ""}`}
                        className="name"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`CBU de la cuenta asociada: `} />
                      <ListItemText
                        primary={`${userData.cbu || ""}`}
                        className="name"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" className="tittle2">
                    Monto a transferir:
                  </Typography>
                  <List className="monto">
                    <ListItem>
                      <ListItemText primary={`Tipo: ${transferData.tipo}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Monto: ${transferData.monto || ""}`}
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
};
export default Transferencia;
