import { Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MiCuentaCard from '../../components/MiCuentaCard/MiCuentaCard'

import "./MiCuentaPage.css";


export default function BasicCard() {
  return (
    <Box className="center-container" sx={{backgroundColor:" #EAEAEA", minHeight:"95vh"}}>
      <MiCuentaCard/>
    </Box>
  );
}
