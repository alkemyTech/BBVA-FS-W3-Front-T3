import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "../../components/terms/TermsAndConditionsModal.jsx";
import api from "../../api/axios.js";
import "../RegisterPage/RegisterPage.css";
import { toast } from "react-toastify";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const isNumber = (num) => /[0-9]*/.test(num);

const ContentBox = styled(Box)(() => ({
  position: "relative",
}));

const JWTRoot = styled(Box)(() => ({
  background: "#45b5c4",
  borderRadius: 12,
  display: "flex",
  justifyContent: "center", // Centrar contenido horizontalmente
  alignItems: "center", // Centrar contenido verticalmente
  minHeight: "90vh", // Ocupar txoda la altura de la ventana
  "& .card": {
    maxWidth: 900,
    minHeight: 100,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
  confirmPassword: "",
  remember: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Debes ingresar tu nombre."),
  lastName: Yup.string().required("Debes ingresar tu apellido."),
  age: Yup.number()
    .required("La edad es necesaria.")
    .min(18, "Debes ser mayor de 18 años."),
  email: Yup.string()
    .email("La dirección de email no es valida.")
    .required("El email es necesario."),
  password: Yup.string()
    .min(3, "La contraseña debe ser mayor a 3 digitos.")
    .required("La contraseña es obligatoria."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden.")
    .required("Se necesita confirmación."),
});

const LogInLink = styled("a")(() => ({
  color: "#1693a5",
  fontWeight: "bold", // Color blanco para el enlace
  textDecoration: "underline", // Subrayar el enlace
  "&:hover": {
    color: "#5c5c5c", // Cambiar el color al pasar el ratón sobre el enlace
  },
}));

const RegisterTitle = styled(Typography)(() => ({
  fontSize: "2.5rem", // Tamaño grande para el título
  fontWeight: "bold", // Texto en negrita
  textAlign: "center",
  color: "#1693a5", // Color blanco para el título
}));

const ImageContainer = styled(JustifyBox)(() => ({
  minWidth: 350,
  maxWidth: "100%", // Ajusta el tamaño máximo de la imagen
}));

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edad, setEdad] = useState("");

  const [openTermsModal, setOpenTermsModal] = useState(false);

  const handleOpenTermsModal = () => {
    setOpenTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setOpenTermsModal(false);
  };

  const onInputChange = (e) => {
    let result = e.target.value.replace(/\D/g, "");
    setEdad(result);
  };

  const handleRegister = (values) => {
    api
      .post("/auth/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then((res) => res.data)
      .then((data) =>
        dispatch(
          addUser({
            fistName: data.user.firstName,
            lastName: data.user.lastName,
            password: data.user.password,
          }),
        ),
      )
      .then(() => {
        toast("Registro exitoso", { type: "success", autoClose: 2000 });
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.errors.includes("DUPLICATED_VALUE")
        ) {
          toast("Ya existe cuenta con ese email. Logeate", {
            type: "warning",
            autoClose: 2000,
          });
          navigate("/");
          return;
        } else if (
          error.response &&
          error.response.data.errors.includes("INVALID_VALUE")
        ) {
          toast(
            "Campo " + error.response.data.data + "invalido",
            error.response.data.err,
          );
        }
        console.log(error);
        toast(" Contraseña invalida", { type: "error", autoClose: 2000 });
      });
  };

  const handleClickLogIn = () => {
    navigate("/");
  };

  return (
    <>
      <JWTRoot>
        <Grid>
          <Box className="flexBox justifyBox">
            <img
              className="img_auth_logo"
              src="/src/assets/logo-no-background.svg"
              width="60%"
              alt=""
            />
          </Box>
          <Grid container component={Card} className="card">
            <Grid item sm={6} xs={12} className="cardForm">
              <Typography>
                <ImageContainer p={4} height="100%">
                  <img
                    src="/src/assets/gato-pc.jpg"
                    className="imgForm"
                    width="100%"
                    alt=""
                  />
                </ImageContainer>
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <RegisterTitle>Registrarse</RegisterTitle>
              <Card className="card">
                <ContentBox>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <TextField
                          fullWidth
                          size="small"
                          name="firstName"
                          label="Nombre"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.firstName}
                          onChange={handleChange}
                          helperText={touched.firstName && errors.firstName}
                          error={Boolean(errors.firstName && touched.firstName)}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="lastName"
                          label="Apellido"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.lastName}
                          onChange={handleChange}
                          helperText={touched.lastName && errors.lastName}
                          error={Boolean(errors.lastName && touched.lastName)}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="age"
                          value={edad}
                          label="Edad"
                          variant="outlined"
                          onBlur={handleBlur}
                          //value={values.age}
                          onChange={onInputChange}
                          helperText={touched.age && errors.age}
                          error={Boolean(errors.age && touched.age)}
                          sx={{ mb: 3, width: "100%" }}
                          inputProps={{
                            type: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                          helperText={touched.email && errors.email}
                          error={Boolean(errors.email && touched.email)}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="password"
                          type="password"
                          label="Contraseña"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                          helperText={touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="confirmPassword"
                          type="password"
                          label="Confirmar contraseña"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          onChange={handleChange}
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          error={Boolean(
                            errors.confirmPassword && touched.confirmPassword,
                          )}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <FlexBox justifyContent="space-between">
                          <FlexBox gap={1}>
                            <Checkbox
                              size="small"
                              name="remember"
                              required={true}
                              onChange={handleChange}
                              checked={values.remember}
                            />
                            Acepto los términos y condiciones.
                            <Button
                              variant="outlined"
                              sx={{ color: "#1693a5", fontSize: "0.5rem" }}
                              onClick={handleOpenTermsModal}
                            >
                              Términos y condiciones
                            </Button>
                          </FlexBox>
                        </FlexBox>

                        <LoadingButton
                          type="submit"
                          variant="contained"
                          sx={{ mx: "40%", my: 2, backgroundColor: "#1693a5" }}
                        >
                          Registrar
                        </LoadingButton>

                        <FlexBox>
                          <FlexBox sx={{ mx: "15%" }}>
                            ¿Ya tienes una cuenta?{" "}
                            <LogInLink
                              onClick={() => handleClickLogIn(values.email)}
                            >
                              Iniciar sesión
                            </LogInLink>
                          </FlexBox>
                        </FlexBox>

                        <TermsAndConditionsModal
                          open={openTermsModal}
                          onClose={handleCloseTermsModal}
                        />
                      </form>
                    )}
                  </Formik>
                </ContentBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </JWTRoot>
    </>
  );
};

export default RegisterPage;
