import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import styled from "styled-components";
import GenericModal from "../../components/Modal/GenericModal";
import {  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import "../../components/Modal/Modal.css"

const Transferencia = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate();
  const [userData, setUserData] = useState({});
  const [transferData, setTransferData] = useState({});

  const TranferenciaTitle = styled(Typography)(() => ({
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    color: 'white',
    textAlign : "center",
  }));

  const initialValues = {
    IddeCuenta: '',
    monto: '',
    tipo: '',
    concepto: '',
  };

  const validationSchema = Yup.object().shape({
    IddeCuenta: Yup.number().positive('La cuenta debe ser un número positivo').required('Campo requerido'),
    monto: Yup.number().positive('El monto debe ser un número positivo').required('Campo requerido'),
    tipo: Yup.string().required('Campo requerido'),
    concepto: Yup.string().required('Campo requerido'),
  });

  const onSubmit = (values) => {
    
     //harcodeo de datos
    setUserData({
      name: "Carlitos Tevez", // Reemplaza por el nombre y apellido del usuario
      cbu: "0568861256004983210586205", // Reemplaza por el CBU obtenido de la cuenta asociada al usuario
    });
    
    setTransferData({
      monto: values.monto,
      tipo: values.tipo === "ARS" ? "$" : "u$d",
    })

    setIsModalOpen(true);

  };

  const handleModalAccept = () => {
    console.log("Formulario enviado:", formik.values);

    formik.resetForm();
    setIsModalOpen(false);
    setSubmitted(true);

    history("/inicio");

    toast.success("Transferencia realizada con éxito!", {
      position: "top-center",
      autoClose: 3000, // Duración de la notificación (en milisegundos)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
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
    maxWidth: "600px",
    width: "100%",
  };

  const messageStyle = {
    backgroundColor: '#7ececa',
    color: 'black',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '20px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#c7ede8',
    color: 'black',
    marginTop: '20px'
  };

  const inputStyle = {
    backgroundColor: '#c7ede8',
    color: 'black',
    width: "100%",
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  return (
    <>
      <CenteredContainer>
        <Box style={formStyle}>
          <TranferenciaTitle variant="h2" sx={{ fontFamily: "Helvetica" }}>
            Tranferencia
          </TranferenciaTitle>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                label="Id de Cuenta"
                name="IddeCuenta"
                variant="filled"
                value={formik.values.IddeCuenta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.IddeCuenta && formik.errors.IddeCuenta ? true : false}
                helperText={formik.touched.IddeCuenta && formik.errors.IddeCuenta ? formik.errors.IddeCuenta : ''}
                type="text"
                inputProps={{ inputMode: 'text' }}
                fullWidth
                InputProps={{
                  style: inputStyle,
                }}
                InputLabelProps={{
                  style: labelStyle,
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                variant="filled"
                label="Monto"
                name="monto"
                value={formik.values.monto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.monto && formik.errors.monto ? true : false}
                helperText={formik.touched.monto && formik.errors.monto ? formik.errors.monto : ''}
                type="text"
                inputProps={{ inputMode: 'numeric' }}
                fullWidth
                InputProps={{
                  style: inputStyle,
                }}
                InputLabelProps={{
                  style: labelStyle,
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                select
                label="Tipo"
                name="tipo"
                variant="filled"
                value={formik.values.tipo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tipo && formik.errors.tipo ? true : false}
                helperText={formik.touched.tipo && formik.errors.tipo ? formik.errors.tipo : ''}
                fullWidth
                SelectProps={{
                  style: inputStyle,
                }}
                InputLabelProps={{
                  style: labelStyle,
                }}
              >
                <MenuItem value="">
                  <em>Seleccionar</em>
                </MenuItem>
                <MenuItem value="ARS">ARS</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </TextField>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                label="Concepto"
                name="concepto"
                variant="filled"
                value={formik.values.concepto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.concepto && formik.errors.concepto ? true : false}
                helperText={formik.touched.concepto && formik.errors.concepto ? formik.errors.concepto : ''}
                type="text"
                inputProps={{ inputMode: 'text' }}
                fullWidth
                InputProps={{
                  style: inputStyle,
                }}
                InputLabelProps={{
                  style: labelStyle,
                }}
              />
            </div>
            <Button variant="contained" style={buttonStyle} type="submit" fullWidth>
              Enviar
            </Button>
          </form>
          {submitted && formik.isValid && (
            <Typography variant="body1" style={messageStyle}>
              Transferencia realizada con éxito!
            </Typography>
          )}
        </Box>
      </CenteredContainer>
      {isModalOpen && formik.isValid && (
       <div className="boxModal"><GenericModal 
          open={isModalOpen}
          content={
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" className="tittle">Usted realizará una transferencia a:</Typography>
              </Grid>
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <ListItemText primary={`Nombre y Apellido del usuario:`} />
                    <ListItemText primary={`${userData.name || ""}`}  className="name" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`CBU de la cuenta asociada: `} />
                    <ListItemText primary={`${userData.cbu || ""}`} className="name"/>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="tittle2">Monto a transferir:</Typography>
                <List className="monto">
                  <ListItem>
                    <ListItemText primary={`Tipo: ${transferData.tipo}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Monto: ${transferData.monto || ""}`} />
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
    </>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 5rem;
`;

export default Transferencia;
