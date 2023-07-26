import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateWrapper() {
  !localStorage.getItem("token")
    ? toast.error("No estás logueado", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      })
    : {};
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
}
