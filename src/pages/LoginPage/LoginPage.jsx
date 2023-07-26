import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Box, styled, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../redux/userSlice.js";
import api from "../../api/axios.js";
import * as Yup from "yup";
import "./LoginPage.css";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./LoginPage.css";

const initialValues = {
  email: "",
  password: "",
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickRegister = () => {
    navigate("/register");
  };
  const handleLogin = (values) => {
    api
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        dispatch(
          addUser({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            token: data.token,
          }),
        );

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      })
      .then(() => {
        toast("Logged In", { type: "success", autoClose: 2000 });
        navigate("/inicio");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.errors.includes("USER_NOT_FOUND")
        ) {
          toast("No tienes cuenta. Deberías registrarte primero", {
            type: "error",
            autoClose: 2000,
          });
          handleClickRegister(values.email);
          return;
        }
        toast("Contraseña inválida", { type: "error", autoClose: 2000 });
      });
  };
  return (
    <>
      <Box className="registerBox">
        <Box className="contextBox">
          <Box className="flexBox justifyBox">
            <img
              className="img_auth_logo"
              src={
                showPassword
                  ? "/src/assets/gato-password.png"
                  : "/src/assets/logo-no-background.svg"
              }
              alt=""
              width="60%"
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
                            startAdornment: (
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

                        <Box justifyContent="space-between">
                          <Box>
                            <Checkbox
                              size="small"
                              name="remember"
                              onChange={handleChange}
                              checked={values.remember}
                              sx={{ padding: 0, marginLeft: "70%" }}
                            />{" "}
                            Recordar
                          </Box>
                        </Box>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            mx: "40%",
                            my: 2,
                            backgroundColor: "#1693a5",
                            alignSelf: "center",
                          }}
                        >
                          Login
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
