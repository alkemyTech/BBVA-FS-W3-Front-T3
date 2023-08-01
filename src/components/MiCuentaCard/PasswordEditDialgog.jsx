/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PasswordTextField from "./PasswordTextField.jsx";
import * as Yup from "yup";

const validatePassword = (password) => {
  const validationSchema = Yup.string()
    .required("Ingrese una contraseña válida")
    .min(3, "La contraseña debe tener al menos 8 caracteres");
  try {
    validationSchema.validateSync(password);
    return { error: false, helperText: "" };
  } catch (error) {
    return { error: true, helperText: error.message };
  }
};

export default function PasswordEditDialog({
  isOpen,
  onClose,
  passwordData,
  handleChangePassword,
  handleSubmitPassword,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ minWidth: "400px" }}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <PasswordTextField
              label="Contraseña actual"
              name="actualPassword"
              value={passwordData.actualPassword}
              onChange={handleChangePassword}
              validate={validatePassword}
            />
          </Box>
          <Box mb={2}>
            <PasswordTextField
              label="Nueva contraseña"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChangePassword}
              validate={validatePassword}
            />
          </Box>
          <Box mb={2}>
            <PasswordTextField
              label="Repetir nueva contraseña"
              name="repeatNewPassword"
              value={passwordData.repeatNewPassword}
              onChange={handleChangePassword}
              validate={(value) => {
                if (value !== passwordData.newPassword) {
                  return {
                    error: true,
                    helperText: "Las contraseñas no coinciden",
                  };
                }
                return { error: false, helperText: "" };
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmitPassword} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
