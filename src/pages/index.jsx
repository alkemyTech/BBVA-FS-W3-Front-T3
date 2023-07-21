import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage.jsx";
import { useState } from "react";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <>
      {user.token && user.token.trim().length > 0 ? (
        <>
          <Header />
          <div>{props.children}</div>
          <Footer />
        </>
      ) : isRegistering ? (
        <RegisterPage setNavigation={setIsRegistering} />
      ) : (
        <LoginPage setNavigation={setIsRegistering} />
      )}
    </>
  );
};

export default Page;
