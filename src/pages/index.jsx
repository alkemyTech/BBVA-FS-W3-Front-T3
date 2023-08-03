import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import Loader from "../components/Loader/LoaderWrapper";
import { useLocation } from "react-router-dom";
import "./toastCustom.css";

const Page = (props) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

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

    setLoading(false);
  }, [dispatch, location]);

  return (
    <>
      {user.token && user.token.trim().length > 0 ? <Header /> : null}
      {loading ? <Loader /> : null}
      {!loading ? (
        <div style={{ visibility: loading ? "hidden" : "visible" }}>
          {props.children}
        </div>
      ) : null}
      {user.token && user.token.trim().length > 0 ? <Footer /> : null}
    </>
  );
};

export default Page;
