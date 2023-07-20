import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, changeEmail } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "../../components/terms/TermsAndConditionsModal.jsx";
import api from "../../api/axios.js";
import "../LoginPage/Auth.css";
import { toast } from "react-toastify";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  marging: "100px",
  position: "relative",
  justifyContent: "center", // Centrar contenido horizontalmente
  alignItems: "center", // Centrar contenido verticalmente
  display: "flex",
  backgroundColor: "#fff",
  borderRadius: 12,
}));

const JWTRoot = styled(Box)(() => ({
  marginTop: "5%",
  marginBottom: "2%",
  background: "#45b5c4",
  borderRadius: 12,
  display: "flex",
  justifyContent: "center", // Centrar contenido horizontalmente
  alignItems: "center", // Centrar contenido verticalmente
  minHeight: "90vh", // Ocupar toda la altura de la ventana
  "& .card": {
    maxWidth: 900,
    minHeight: 100,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
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
  firstName: Yup.string().required("Debes ingresar tu Nombre!"),
  lastName: Yup.string().required("Debes ingresar tu apellido!"),
  age: Yup.number()
    .required("La edad es necesaria!")
    .min(18, "Debes ser mayor de 18 años!"),
  email: Yup.string()
    .email("La dirección de Email no es valida")
    .required("El Email es necesario!"),
  password: Yup.string()
    .min(3, "La contraseña debe ser mayor a 3 digitos")
    .required("La contraseña es obligatoria!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Se necesita confirmación!"),
});

const LogInLink = styled("a")(() => ({
  color: "#1693a5",
  fontWeight: "bold", // Color blanco para el enlace
  textDecoration: "underline", // Subrayar el enlace
  "&:hover": {
    color: "#e3f2fd", // Cambiar el color al pasar el ratón sobre el enlace
  },
}));

const RegisterTitle = styled(Typography)(() => ({
  fontSize: "2.5rem", // Tamaño grande para el título
  fontWeight: "bold", // Texto en negrita
  color: "#1693a5", // Color blanco para el título
}));

const ImageContainer = styled(JustifyBox)(() => ({
  minWidth: 350,
  maxWidth: "100%", // Ajusta el tamaño máximo de la imagen
}));
const CustomCheckbox = styled(Checkbox)(() => ({
  padding: 0,
  color: "black", // O el color que desees para el checkbox
}));

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openTermsModal, setOpenTermsModal] = useState(false);

  const handleOpenTermsModal = () => {
    setOpenTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setOpenTermsModal(false);
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
            token: data.token,
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
          dispatch(changeEmail(null));
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

  const handleClickLogIn = (email) => {
    dispatch(changeEmail(email));
    navigate("/");
  };

  return (
    <>
      <JWTRoot>
        <Grid>
          <JustifyBox p={0} height="100%" sx={{ minWidth: 200 }}>
            <img
              className="img_auth_logo"
              src="/src/assets/logo-no-background.svg"
              width="100%"
              alt=""
            />
          </JustifyBox>
          <Card className="card">
            <Grid container sx={{ backgroundColor: "#fff" }}>
              <Grid item sm={6} xs={12}>
                <RegisterTitle>Regístrate</RegisterTitle>
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
                <Card
                  className="card"
                  sx={{ width: "100%", marginTop: "100px", color: "red" }}
                >
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
                            error={Boolean(
                              errors.firstName && touched.firstName,
                            )}
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
                            type="number"
                            label="Edad"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.age}
                            onChange={handleChange}
                            helperText={touched.age && errors.age}
                            error={Boolean(errors.age && touched.age)}
                            sx={{ mb: 3, width: "100%" }}
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
                            label="Confirm Password"
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
                              <CustomCheckbox
                                size="small"
                                name="remember"
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
                            sx={{ my: 2, backgroundColor: "#1693a5" }}
                          >
                            Registrar
                          </LoadingButton>

                          <FlexBox>
                            <FlexBox gap={1}>
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
          </Card>
        </Grid>
      </JWTRoot>
    </>
  );
};

export default RegisterPage;