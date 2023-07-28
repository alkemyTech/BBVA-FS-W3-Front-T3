import { Grid } from "@mui/material";
import CuentaPesos from "../../components/MiCuentaCard/CuentaPesos/CuentaPesos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MiCuentaCard from '../../components/MiCuentaCard/MiCuentaCard'

import "./MiCuentaPage.css";
import UserInfoCard from "../../components/Home/UserInfoCard/UserInfoCard";

export default function BasicCard() {
  const navigate = useNavigate();

  return (
    <div className="center-container">
      <MiCuentaCard/>
    </div>
  );
}
