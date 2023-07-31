import { Box } from "@mui/material";
import MiCuentaCard from "../../components/MiCuentaCard/MiCuentaCard";

import "./MiCuentaPage.css";

export default function BasicCard() {
  return (
    <Box
      className="center-container"
      sx={{ backgroundColor: " #EAEAEA", minHeight: "95vh" }}
    >
      <MiCuentaCard />
    </Box>
  );
}
