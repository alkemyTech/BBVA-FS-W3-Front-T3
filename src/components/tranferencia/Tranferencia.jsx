import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import image from '../../assets/3.png'
import styled from 'styled-components';

const Tranferencia = () => {
  const [submitted, setSubmitted] = useState(false);

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
    console.log('Valores enviados:', values);
    setSubmitted(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const formStyle = {
    backgroundColor: '#45b5c4',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
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
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  return (
    <Box style={formStyle}>
     <TranferenciaTitle variant="h2" sx = {{fontFamily : "Helvetica"}}>
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
      {submitted && formik.isValid && ( // Agregamos la validación de formik.isValid
        <Typography variant="body1" style={messageStyle}>
          Transferencia realizada con éxito!
        </Typography>
      )}
     <img
  src={image}
  alt="Imagen"
  style={{
    marginTop: '20px',
    maxWidth: '100%',
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
  }}
/>
    </Box>
  );
};

export default Tranferencia;