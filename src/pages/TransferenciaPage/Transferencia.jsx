import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Transferencia = () => {
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

  const onSubmit = (values) => {
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
    <Box className="transactionBox">
      <Box className="formStyle">
        <TranferenciaTitle>TRANSFERENCIA</TranferenciaTitle>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="CBU"
            name="cbu"
            variant="filled"
            value={formik.values.cbu}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.cbu && formik.errors.cbu)}
            helperText={
              formik.touched.cbu && formik.errors.cbu ? formik.errors.cbu : ""
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
    </Box>
  );
};
export default Transferencia;
