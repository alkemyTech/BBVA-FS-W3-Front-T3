import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Deposit from "./components/deposit/Deposit";
import Page from "./pages/index.jsx";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" />
        <Route path="/inicio"/>
        <Route path="/transacciones"/>
        <Route path="/depositos" element={<Deposit/>} />
        <Route path="/inversiones"/>
      </Routes>
    </Page>
  );
}
export default App;
