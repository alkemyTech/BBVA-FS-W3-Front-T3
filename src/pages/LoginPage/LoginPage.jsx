import { Card, Checkbox, Grid, TextField, Button } from "@mui/material";
import { Box, styled, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser, changeEmail } from "../../redux/userSlice.js";
import api from "../../api/axios.js";
import * as Yup from "yup";

import "./Auth.css";

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
  email: "damian@vikatcode.com",
  password: "vikatcode",
  remember: true,
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, "Password must be 3 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});
const RegisterLink = styled("a")(() => ({
  color: "#1693a5",
  fontWeight: "bold", // Color blanco para el enlace
  textDecoration: "underline", // Subrayar el enlace
  "&:hover": {
    color: "#e3f2fd", // Cambiar el color al pasar el ratón sobre el enlace
  },
}));
const LoginTitle = styled(Typography)(() => ({
  fontSize: "2.5rem", // Tamaño grande para el título
  fontWeight: "bold", // Texto en negrita
  color: "#1693a5", // Color blanco para el título
}));

const ImageContainer = styled(JustifyBox)(() => ({
  minWidth: 350,
  maxWidth: "100%", // Ajusta el tamaño máximo de la imagen
}));
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickRegister = (email) => {
    navigate("/register");
    dispatch(changeEmail(email));
  };
  const handleLogin = (values) => {
    api
      .post("/auth/login", {
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
            email: data.user.email,
          }),
        ),
      )
      .then(() => {
        toast("Logged In", { type: "success", autoClose: 2000 });
        navigate("/inicio");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.errors.includes("USER_NOT_FOUND")
        ) {
          toast("No tienes cuenta. Deberias registrarte primero", {
            type: "error",
            autoClose: 2000,
          });
          handleClickRegister(values.email);
          return;
        }
        toast(" Contraseña invalida", { type: "error", autoClose: 2000 });
      });
  };
  return (
    <>
      <JWTRoot>
        <Box>
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
                <LoginTitle>Ingresa a tu cuenta</LoginTitle>
                <Typography>
                  <ImageContainer p={4} height="100%">
                    <img
                      className="imgForm"
                      src="/src/assets/login_image.jpg"
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
                      onSubmit={handleLogin}
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
                            label="Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            helperText={touched.password && errors.password}
                            error={Boolean(errors.password && touched.password)}
                            sx={{ mb: 3, width: "100%" }}
                          />

                          <FlexBox justifyContent="space-between">
                            <FlexBox gap={1}>
                              <Checkbox
                                size="small"
                                name="remember"
                                onChange={handleChange}
                                checked={values.remember}
                                sx={{ padding: 0 }}
                              />{" "}
                              Recordar
                            </FlexBox>
                          </FlexBox>

                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ my: 2, backgroundColor: "#1693a5" }}
                          >
                            Login
                          </Button>

                          <FlexBox>
                            <FlexBox gap={1}>
                              Si no estás registrado, puedes{" "}
                              <RegisterLink
                                onClick={() =>
                                  handleClickRegister(values.email)
                                }
                              >
                                registrarte aquí
                              </RegisterLink>
                            </FlexBox>
                          </FlexBox>
                        </form>
                      )}
                    </Formik>
                  </ContentBox>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </JWTRoot>
    </>
  );
};
export default LoginPage;