import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Deposit from "./components/deposit/Deposit";
import Page from "./pages/index.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import SimuladorPlazoFijo from './pages/SimuladorPlazoFijoPage/SimuladorPlazoFijo.jsx'

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/inicio" />
        <Route path="/transacciones" />
        <Route path="/depositos" element={<Deposit />} />
        <Route path="inversiones/simuladorplazofijo" element={<SimuladorPlazoFijo />} />
        <Route path="/inversiones" />
        <Route path="/account" />
      </Routes>
    </Page>
  );
}
export default App;
