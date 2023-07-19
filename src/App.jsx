import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Deposit from "./components/deposit/Deposit";
import Page from "./pages/index.jsx";
import Transferencia from "./pages/Transferencia";
import SimuladorPlazoFijo from './pages/SimuladorPlazoFijo'
import Tranferencia from './components/tranferencia/Tranferencia'



function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/depositos" element={<Deposit/>} />
        <Route path="/transferencias" element={<Transferencia/>} />
        <Route path="/inversiones/simuladorplazofijo" element={<SimuladorPlazoFijo/>} />
      </Routes>
    </Page>
    <>   
    <Tranferencia/> 
    </>
  );
}
export default App;
