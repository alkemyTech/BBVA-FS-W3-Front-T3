import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { CircularProgress } from "@mui/material";
import Navigator from "../components/sidebar/Navigator";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad de la barra lateral
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(
        addUser({
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }),
      );
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Función para cambiar la visibilidad de la barra lateral
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
        
          {user.token && user.token.trim().length > 0 && isSidebarOpen && <Navigator isOpen={isSidebarOpen} />}

          
          {user.token && user.token.trim().length > 0 && (<Header isSidebarOpen={isSidebarOpen} onToggleSidebar={handleSidebarToggle} />)}
          <div>{props.children}</div>

          {user.token && user.token.trim().length > 0 && <Footer />}
        </>
      )}
    </>
  );
};

export default Page;
