import { useState } from "react";
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
  DialogActions,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, changeName } from "../../redux/userSlice";
import EditIcon from "@mui/icons-material/Edit";
import UsersApi from "../../api/usersApi.js";
import EditModal from "../Modal/EditModal.jsx";
import PasswordEditDialog from "./PasswordEditDialgog.jsx";

export default function UserInfoCard() {
  const user = useSelector((state) => state.user);
  const [fieldToChange, setFieldToChange] = useState({ title: "", value: "" });
  const [passwordData, setPasswordData] = useState({
    actualPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [isNameEditModalOpen, setIsNameEditModalOpen] = useState(false);
  const [isLastNameEditModalOpen, setIsLastNameEditModalOpen] = useState(false);
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
    setFieldToChange({ title: "Nombre", value: firstName });
    setIsLastNameEditModalOpen(false);
    setIsNameEditModalOpen(true);
  };

  const handleUpdateName = (data) => {
    handleUpdateUser({ firstName: data });
  };

  const handleEditLastName = (lastName) => {
    setFieldToChange({ title: "Apellido", value: lastName });
    setIsNameEditModalOpen(false);
    setIsLastNameEditModalOpen(true);
  };

  const handleUpdateLastName = (data) => {
    handleUpdateUser({ lastName: data });
  };

  const handleCloseModal = () => {
    setIsLastNameEditModalOpen(false);
    setIsNameEditModalOpen(false);
    setFieldToChange({ title: "", value: "" });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({
      actualPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    });
  };

  const handleSubmitPassword = () => {
    UsersApi.updateUser(user.id, {
      password: passwordData.newPassword,
      oldPassword: passwordData.actualPassword,
    }).then(() => {
      handleClosePasswordModal();
    });
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
      localStorage.setItem("user", JSON.stringify(user));
    });
  };

  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 600, boxShadow: "5px 5px 15px #CFCFCF" }}
    >
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

          <Grid item xs={3} sx={{ height: "40px" }}>
            <Typography variant="h6" color="text.secondary">
              Email:{" "}
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{ height: "40px" }}>
            <Typography variant="h6">{user.email}</Typography>
          </Grid>

          <Grid item xs={3} sx={{ height: "40px" }}>
            <Typography variant="h6" color="text.secondary">
              Contraseña:{" "}
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{ height: "40px" }}>
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

      {isNameEditModalOpen && (
        <EditModal
          isOpen={isNameEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleUpdateName}
          currentDescription={fieldToChange.value}
          label={`Nuevo Nombre`}
          title={"Nombre"}
        />
      )}

      {isLastNameEditModalOpen && (
        <EditModal
          isOpen={isLastNameEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleUpdateLastName}
          currentDescription={fieldToChange.value}
          label={`Nuevo Apellido`}
          title={"Apellido"}
        />
      )}

      <PasswordEditDialog
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        passwordData={passwordData}
        handleChangePassword={handleChangePassword}
        handleSubmitPassword={handleSubmitPassword}
      />

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
