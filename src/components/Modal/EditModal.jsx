/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditModal = ({
  isOpen,
  onClose,
  onSave,
  currentDescription,
  title,
  label,
}) => {
  const [editedDescription, setEditedDescription] =
    useState(currentDescription);
  const handleChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(editedDescription);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-title" gutterBottom>
          Editar {title}
        </Typography>
        <TextField
          fullWidth
          label={label}
          value={editedDescription}
          onChange={handleChange}
          variant="outlined"
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="secondary"
            sx={{ marginRight: "10px" }}
          >
            Guardar
          </Button>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
