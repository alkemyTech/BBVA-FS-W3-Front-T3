import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Box, styled, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice.js";
import AuthApi from "../../api/authApi.js";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./LoginPage.css";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, "La contraseña debe tener al menos 3 caracteres.")
    .required("¡Se requiere una contraseña!"),
  email: Yup.string()
    .email("Dirección de correo electrónico inválida.")
    .required("¡Se requiere un correo electrónico!"),
});

const RegisterLink = styled("a")(() => ({
  color: "#1693a5",
  fontWeight: "bold", // Color blanco para el enlace
  textDecoration: "underline", // Subrayar el enlace
  "&:hover": {
    color: "#5c5c5c", // Cambiar el color al pasar el ratón sobre el enlace
  },
}));

const LoginTitle = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#1693a5",
  textAlign: "center",
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("remember"))) {
      initialValues.email = JSON.parse(localStorage.getItem("remember"))
        .remember
        ? JSON.parse(localStorage.getItem("remember")).email
        : "";
    }
  }, []);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickRegister = () => {
    navigate("/register");
  };
  const handleLogin = (values) => {
    AuthApi.login(values)
      .then((data) => {
        dispatch(
          addUser({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            token: data.token,
          }),
        );

        localStorage.setItem(
          "remember",
          JSON.stringify({
            email: data.user.email,
            remember: !!values.remember,
          }),
        );
        navigate("/inicio");
      })
      .catch((registered) => {
        if (!registered) {
          handleClickRegister(values.email);
        }
      });
  };

  const handleClickNewPassword = () => {
    setOpenForgotPassword(true);
  };
  const handleCloseForgotPasswordClose = () => {
    setOpenForgotPassword(false);
  };
  return (
    <>
      <Box className="loginBox">
        <Box className="contextBox">
          <Box className="flexBox justifyBox">
            <img
              className="img_auth_logo"
              src={
                showPassword
                  ? "/src/assets/gato-password.png"
                  : "/src/assets/logo-no-background.svg"
              }
              width="60%"
              alt=""
            />
          </Box>

          <Grid container component={Card} className="card">
            <Grid item sm={6} xs={12} className="cardForm">
              <Typography>
                <Box p={4}>
                  <img
                    className="imgForm"
                    src="/src/assets/login_image.png"
                    width="100%"
                    alt=""
                  />
                </Box>
              </Typography>
            </Grid>

            <Grid item sm={6} xs={12}>
              <LoginTitle>Iniciar Sesión</LoginTitle>
              <Card className="card">
                <Box className="flexBox">
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
                          placeholder="tu@email.com"
                          required={true}
                          error={Boolean(errors.email && touched.email)}
                          helperText={touched.email && errors.email}
                          sx={{ mb: 3, width: "100%" }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          label="Contraseña"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Gato123"
                          onChange={handleChange}
                          helperText={touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          sx={{ mb: 3, width: "100%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <Grid container justifyContent="space-between">
                          <Grid item xs={6}>
                            <Checkbox
                              size="small"
                              name="remember"
                              onChange={handleChange}
                              checked={values.remember}
                              sx={{ padding: 0 }}
                            />{" "}
                            Recordar
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{ textAlign: "right", color: "#1693a5" }}
                          >
                            <RegisterLink
                              onClick={() =>
                                handleClickNewPassword(values.email)
                              }
                            >
                              ¿Olvidaste tu contraseña?
                            </RegisterLink>
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            my: 2,
                            backgroundColor: "#1693a5",
                            alignSelf: "center",
                            marginLeft: "35%",
                          }}
                        >
                          Iniciar Sesión
                        </Button>

                        <Box sx={{ mx: "15%" }}>
                          Si no estás registrado, puedes{" "}
                          <RegisterLink
                            onClick={() => handleClickRegister(values.email)}
                          >
                            registrarte aquí
                          </RegisterLink>
                        </Box>
                      </form>
                    )}
                  </Formik>
                  <Dialog
                    open={openForgotPassword}
                    onClose={() => setOpenForgotPassword(false)}
                    sx={{ textAlign: "center" }}
                  >
                    <DialogTitle
                      sx={{ marginBottom: "-30px", marginTop: "10px" }}
                      textAlign={"center"}
                    >
                      <img
                        style={{ width: "200px" }}
                        src="/src/assets/flat_750x_075_f-pad_750x1000_f8f8f8-removebg-preview (1).png"
                        alt=""
                      />
                    </DialogTitle>
                    <DialogTitle sx={{ padding: "20px" }}>
                      Por favor, contacta con nuestro chat de soporte para
                      recuperar tu contraseña.
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        onClick={handleCloseForgotPasswordClose}
                        color="primary"
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;
