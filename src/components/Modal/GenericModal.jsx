import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  width: "30%",
  margin: "auto",
}));

const ModalContent = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
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
        <CardHeader
          title={title}
          titleTypographyProps={{
            variant: "h5",
            align: "center",
            color: "white",
          }}
          sx={{ backgroundColor: "#45B5C4" }}
        />
        <CardContent id="modal-description">{content}</CardContent>
        <Box display="flex" justifyContent="space-between" m={2}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button onClick={onAccept} variant="contained" color="secondary">
            Aceptar
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default GenericModal;
