import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage.jsx";

const Page = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.token && user.token.trim().length > 0 ? (
        <>
          <Header />
          <div>{props.children}</div>
          <Footer />
        </>
      ) : (
          (user.email && user.email.trim().length > 0) ? (
              <RegisterPage/>
          ) : (<LoginPage/>)
      )}
    </>
  );
};

export default Page;
