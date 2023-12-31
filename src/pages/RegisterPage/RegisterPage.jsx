import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "../../components/terms/TermsAndConditionsModal.jsx";
import AuthApi from "../../api/authApi.js";
import "../RegisterPage/RegisterPage.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  position: "relative",
}));

const JWTRoot = styled(Box)(() => ({
  background: "#45b5c4",
  borderRadius: 12,
  height: "98vh",
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
  age: Yup.string()
    .required("Debe ingresar una edad.")
    .matches(/^[0-9]+$/, "Debe ingresar un número.")
    .test("age", "Debe ser mayor a 18 años", (value) => {
      const ageNumber = parseInt(value);
      return ageNumber >= 18;
    }),
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
  const navigate = useNavigate();

  const [openTermsModal, setOpenTermsModal] = useState(false);

  const handleOpenTermsModal = () => {
    setOpenTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setOpenTermsModal(false);
  };

  const handleRegister = (values) => {
    AuthApi.register(values)
      .then(() => {
        navigate("/");
      })
      .catch((registered) => {
        if (registered) {
          navigate("/");
        }
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
                          value={values.age}
                          label="Edad"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
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
