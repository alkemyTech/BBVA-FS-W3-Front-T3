import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import GenericModal from "../../components/Modal/GenericModal";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "../../components/Modal/Modal.css";

import AccountsApi from "../../api/accountsApi.js";
import TransactionsApi from "../../api/transactionsApi.js";
import "../TransaccionesPage.css";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Transferencia = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    if (value.length === 22) {
      AccountsApi.getAccountByCbu(value).then((data) => {
        setCbuInfo(data);
        setIsLoading(false);
      });
    } else {
      resetCbuInfo();
      setIsLoading(false);
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
      navigate("/inicio");
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

  const StyledDiv = styled("div")({
    display: "inline-block",
    marginRight: "15px", // Ajusta el valor para más o menos espacio horizontal
  });

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
              formik.touched.cbu && formik.errors.cbu ? (
                formik.errors.cbu
              ) : (
                <>
                  {isLoading ? (
                    <CircularProgress />
                  ) : cbuInfo.user.firstName &&
                    cbuInfo.user.lastName &&
                    cbuInfo.currency ? (
                    <>
                      <StyledDiv>
                        <b>Destinatario:</b> {cbuInfo.user.firstName}{" "}
                        {cbuInfo.user.lastName}
                      </StyledDiv>
                      <StyledDiv>
                        <b>Cuenta:</b> {cbuInfo.currency}
                      </StyledDiv>
                    </>
                  ) : null}
                </>
              )
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
            title={"Confirmación de tranferencia:"}
            content={
              <Grid container spacing={2} sx={{ width: "500px" }}>
                {/* First column */}
                <Grid item xs={5}>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={5}>
                          <ListItemText primary={`Destinatario:`} />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={5}>
                          <ListItemText primary={`CBU:`} />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={5}>
                          <ListItemText primary={`Monto:`} />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={5}>
                          <ListItemText primary={`Motivo:`} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>

                {/* Second column */}
                <Grid item xs={7}>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={7}>
                          <ListItemText
                            primary={` ${userData.name}`}
                            className="name"
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={7}>
                          <ListItemText
                            primary={` ${userData.cbu}`}
                            className="name"
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={7}>
                          <ListItemText
                            primary={` ${transferData.amount} ${transferData.currency}`}
                            className="name"
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={7}>
                          <ListItemText
                            primary={` ${transferData.description}`}
                            className="name"
                          />
                        </Grid>
                      </Grid>
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
