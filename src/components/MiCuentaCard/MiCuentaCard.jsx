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
import { logoutUser, changeName } from "../../redux/userSlice";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import UsersApi from "../../api/usersApi.js";
import EditModal from "../Modal/EditModal.jsx";

export default function UserInfoCard() {
  const user = useSelector((state) => state.user);
  const [fieldToChange, setFieldToChange] = useState({ title: "", value: "" });
  const [transferData, setTransferData] = useState({});
  const [handleUpdate, setHandleUpdate] = useState({
    myFunction: () => {
      console.log("Function is called!");
    },
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleEditFirstName = (firstName) => {
    setTransferData({ firstName: firstName });
    setFieldToChange({ title: "Nombre", value: firstName });
    setHandleUpdate({ myFunction: handleUpdateFirstName });
    handleOpenEditModal();
  };

  const handleUpdateFirstName = (data) => {
    setTransferData({ firstName: data });
    handleUpdateUser(transferData);
  };

  const handleEditLastName = (lastName) => {
    setTransferData({ lastName: lastName });
    setFieldToChange({ title: "Apellido", value: lastName });
    setHandleUpdate({ myFunction: handleUpdateLastName });
    handleOpenEditModal();
  };

  const handleUpdateLastName = (data) => {
    setTransferData({ lastName: data });
    handleUpdateUser(transferData);
  };
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setFieldToChange({ title: "", value: "" });
    setIsEditModalOpen(false);
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

  const handleUpdateUser = (data) => {
    UsersApi.updateUser(user.id, data).then((user) => {
      dispatch(changeName(user.firstName + " " + user.lastName));
    });
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 600 }}>
      <CardHeader
        title="Mis Datos"
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
          justifyContent="space-between"
          sx={{
            padding: 2,
          }}
        >
          <Grid item xs={3}>
            <Typography variant="h6" color="text.secondary">
              Nombre:{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">{user.name.split(" ")[0]}</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              justifyContent: "flex-end", // Align the icon to the right
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => handleEditFirstName(user.name.split(" ")[0])}
            >
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h6" color="text.secondary">
              Apellido:{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">{user.name.split(" ")[1]}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => handleEditLastName(user.name.split(" ")[1])}
            >
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3} sx={{height:"40px"}}>
            <Typography variant="h6" color="text.secondary">
              Email:{" "}
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{height:"40px"}} >
            <Typography variant="h6">{user.email}</Typography>
          </Grid>

          <Grid item xs={3} sx={{height:"40px"}}>
            <Typography variant="h6" color="text.secondary">
              Contraseña:{" "}
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{height:"40px"}}>
            <Typography variant="h6">*****</Typography>
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

      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleUpdate.myFunction}
          currentDescription={fieldToChange.value}
          label={`Nuevo ${fieldToChange.title}`}
          title={fieldToChange.title}
        />
      )}
      <Formik
        initialValues={{
          newPassword: "",
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string().required("Ingrese una contraseña válida"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          UsersApi.updateUser(user.id, {
            password: values.newPassword,
          });
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
