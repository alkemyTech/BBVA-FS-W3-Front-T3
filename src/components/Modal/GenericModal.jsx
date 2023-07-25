import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  width: "30%",
  margin: "auto",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: "8px",
  fontWeight: "bold",
}));

const GenericModal = ({ open, title, content, onClose, onAccept }) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <Typography variant="h6" id="modal-title">
          {title}
        </Typography>
        <Typography variant="body1" id="modal-description">
          {content}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={onAccept} variant="contained" color="primary">
            Aceptar
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default GenericModal;
