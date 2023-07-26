import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(
        addUser({
          id: user.id,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }),
      );
    }
  }, [dispatch]);

  return (
    <>
      {user.token && user.token.trim().length > 0 ? <Header /> : <></>}
      <>
        <div>{props.children}</div>
      </>

      {user.token && user.token.trim().length > 0 ? <Footer /> : <></>}
    </>
  );
};

export default Page;
