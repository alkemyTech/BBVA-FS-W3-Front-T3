import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser} from "../redux/userSlice.js";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const Page = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        //fetchData();
        dispatch(addUser({name: "Roby Sprenger", username: "robyspr", email: "robyspr@email.com"}))
    }, []);

  return (
    <>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};

export default Page;
