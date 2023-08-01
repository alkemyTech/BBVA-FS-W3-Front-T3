import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
  Avatar,
  styled,
  Badge,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import UsersApi from "../../api/usersApi.js";

export default function UserInfoCard() {
  const user = useSelector((state) => state.user);

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },

    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const handleOpenNameModal = () => {
    setIsNameModalOpen(true);
  };

  const handleCloseNameModal = () => {
    setIsNameModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const handleCloseDeletePasswordModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const handleDeleteAccount = () => {
    setIsDeleteAccountModalOpen(false);
    UsersApi.deleteUser(user.id).then(() => {
      dispatch(logoutUser());
      navigate("/");
    });
  };

  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 600, boxShadow: "5px 5px 15px #CFCFCF" }}
    >
      <CardHeader
        title="Datos Usuario"
        titleTypographyProps={{ variant: "h4" }}
        sx={{ backgroundColor: "#E9FEFA" }}
        avatar={
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ backgroundColor: "#E9FEFA" }}
              alt="kitty"
              src="/src/assets/avatarCat1.png"
            />
          </StyledBadge>
        }
      />
      <CardContent>
        <Grid
          container
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Nombre:{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6">{user.name.split(" ")[0]}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
              justifyContent: "flex-end", // Align the icon to the right
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleOpenNameModal}
            >
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Apellido:{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6">{user.name.split(" ")[1]}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleOpenNameModal}
            >
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Email:{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <Typography variant="h6">{user.email}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              placeItems: "center",
              justifyContent: "flex-end", // Align the icon to the right
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleOpenNameModal}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="text" onClick={handleOpenPasswordModal}>
          Cambiar Contraseña
        </Button>
        <Button
          variant="text"
          sx={{ color: "red" }}
          onClick={handleOpenDeleteModal}
        >
          Eliminar Cuenta
        </Button>
      </CardActions>

      <Formik
        initialValues={{
          newName: "",
          newLastName: "",
        }}
        validationSchema={Yup.object().shape({
          newName: Yup.string().required("Ingrese un nombre válido"),
          newLastName: Yup.string().required("Ingrese un apellido válido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values.newName, values.newLastName);
          setSubmitting(false);
          handleCloseNameModal();
          toast.success("Nombre y Apellido cambiado correctamente", {
            position: "top-center",
            autoClose: 3000,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Dialog open={isNameModalOpen} onClose={handleCloseNameModal}>
            <DialogTitle>Cambiar Nombre y/o Apellido</DialogTitle>
            <Form>
              <DialogContent>
                <Field
                  as={TextField}
                  label="Cambiar Nombre"
                  variant="filled"
                  fullWidth
                  name="newName"
                />
                <ErrorMessage name="newName" component="div" />
              </DialogContent>
              <DialogContent>
                <Field
                  as={TextField}
                  label="Cambiar Apellido"
                  variant="filled"
                  fullWidth
                  name="newLastName"
                />
                <ErrorMessage name="newLastName" component="div" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseNameModal} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Aceptar
                </Button>
              </DialogActions>
            </Form>
          </Dialog>
        )}
      </Formik>

      <Formik
        initialValues={{
          newPassword: "",
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string().required("Ingrese una contraseña válida"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values.newPassword);
          setSubmitting(false);
          handleClosePasswordModal();
          toast.success("Contraseña cambiada correctamente", {
            position: "top-center",
            autoClose: 3000,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Dialog open={isPasswordModalOpen} onClose={handleClosePasswordModal}>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <Form>
              <DialogContent>
                <Field
                  as={TextField}
                  label="Ingrese su contraseña anterior"
                  variant="filled"
                  fullWidth
                  name="newPassword"
                  type="password"
                />
                <Field
                  as={TextField}
                  label="Ingrese su nueva contraseña"
                  variant="filled"
                  fullWidth
                  name="newPassword"
                  type="password"
                />
                <Field
                  as={TextField}
                  label="Repita su nueva contraseña"
                  variant="filled"
                  fullWidth
                  name="newPassword"
                  type="password"
                />
                <ErrorMessage name="newPassword" component="div" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosePasswordModal} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Aceptar
                </Button>
              </DialogActions>
            </Form>
          </Dialog>
        )}
      </Formik>

      <Dialog
        open={isDeleteAccountModalOpen}
        onClose={handleCloseDeletePasswordModal}
      >
        <DialogTitle>¿Está seguro que quiere eliminar su cuenta?</DialogTitle>

        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <img width={"250px"} src="/src/assets/sadCat.png" alt="" />
          </CardContent>
        </Card>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleDeleteAccount} color="error">
            ELIMINAR
          </Button>
          <Button
            onClick={handleCloseDeletePasswordModal}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
