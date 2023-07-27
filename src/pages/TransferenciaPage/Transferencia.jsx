import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import GenericModal from "../../components/Modal/GenericModal";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import "../../components/Modal/Modal.css";

import AccountsApi from "../../api/accountsApi.js";
import TransactionsApi from "../../api/transactionsApi.js";
import "../TransaccionesPage.css";

const Transferencia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cbuInfo, setCbuInfo] = useState({
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
    },
    id: 0,
    cbu: "",
    balance: 0,
    currency: "",
    transactionLimit: 0.0,
  });
  const [userData, setUserData] = useState({});
  const [transferData, setTransferData] = useState({});

  const initialValues = {
    cbu: "",
    monto: "",
    moneda: "",
    concepto: "",
  };
  const resetCbuInfo = () => {
    setCbuInfo({
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
      },
      id: cbuInfo.id,
      cbu: "",
      balance: 0,
      currency: "",
      transactionLimit: 0.0,
    });
  };
  const validationSchema = Yup.object().shape({
    cbu: Yup.number()
      .positive("La cuenta debe ser un número positivo")
      .required("Campo requerido"),
    monto: Yup.number()
      .positive("El monto debe ser un número positivo")
      .required("Campo requerido"),
    moneda: Yup.string()
      .oneOf(
        [cbuInfo.currency],
        "No coincide con la moneda de la cuenta destino",
      )
      .required("Campo requerido")
      .ensure(),
    concepto: Yup.string().required("Campo requerido"),
  });

  const validateCbu = (value) => {
    if (value.length === 22) {
      AccountsApi.getAccountByCbu(value).then((data) => {
        setCbuInfo(data);
      });
    } else {
      resetCbuInfo();
    }
  };

  const onSubmit = (values) => {
    setUserData({
      name: cbuInfo.user.firstName + " " + cbuInfo.user.lastName,
      cbu: values.cbu, // Reemplaza por el CBU obtenido de la cuenta asociada al usuario
    });

    setTransferData({
      amount: values.monto,
      destinationAccountId: cbuInfo.id,
      currency: values.moneda,
      description: values.concepto,
    });

    setIsModalOpen(true);
  };

  const handleModalAccept = () => {
    TransactionsApi.send(transferData).then(() => {
      formik.resetForm();
      setIsModalOpen(false);
      resetCbuInfo();
    });
  };

  const handleModalCancel = () => {
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
    <Box className="transactionBox">
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
          TRANSFERENCIA
        </Typography>
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
              formik.touched.cbu && formik.errors.cbu
                ? formik.errors.cbu
                : `${cbuInfo.user.firstName} ${cbuInfo.user.lastName}  ${cbuInfo.currency}`
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
};
export default Transferencia;
