import { Navigate, Outlet } from "react-router-dom";
export default function PrivateWrapperLogin() {
  return localStorage.getItem("token") ? <Navigate to="/inicio" /> : <Outlet />;
}
