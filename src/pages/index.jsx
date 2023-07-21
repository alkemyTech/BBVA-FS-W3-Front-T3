import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { CircularProgress } from "@mui/material";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <>
      {isLoading ? ( // Mostrar el cargador mientras se verifica la autenticación
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Establecer el alto del contenedor para ocupar toda la pantalla verticalmente
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {user.token && user.token.trim().length > 0 ? <Header /> : <></>}
          <>
            <div>{props.children}</div>
          </>

          {user.token && user.token.trim().length > 0 ? <Footer /> : <></>}
        </>
      )}
    </>
  );
};

export default Page;
