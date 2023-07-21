import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage.jsx";
import Navigator from "../components/sidebar/Navigator";
import { useState } from "react";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  return (
    <>
      {user.token && user.token.trim().length > 0 ? (
        <>
        <Navigator open={isSidebarOpen} />
           <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        
          <div>{props.children}</div>
          <Footer />
        </>
      ) : user.email && user.email.trim().length > 0 ? (
        <RegisterPage />
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Page;
