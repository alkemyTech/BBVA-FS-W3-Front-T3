import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SimuladorPlazoFijo from "./pages/SimuladorPlazoFijoPage/SimuladorPlazoFijo.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import DepositPage from "./pages/DepositPage/DepositPage.jsx";
import InvestmentPage from "./pages/InvestmentPage/InvestmentPage.jsx";
import Transferencias from "./pages/TransferenciaPage/Transferencia.jsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import Prestamo from "./pages/Prestamo/Prestamo.jsx";
import PrivateWrapper from "./pages/PrivateWrappers/PrivateWrapper.jsx";
import PrivateWrapperLogin from "./pages/PrivateWrappers/PrivateWrapperLogin.jsx";
import MiCuenta from "./pages/MiCuentaPage/MiCuentaPage.jsx";
import Page from "./pages/index.jsx";

function App() {
  return (
    <Page>
      <Routes>
        <Route element={<PrivateWrapperLogin />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/transacciones" />
          <Route path="/account" element={<MiCuenta />} />
          <Route path="/inversiones" element={<InvestmentPage />} />
          <Route path="/inversiones">
            <Route path="plazofijo" element={<SimuladorPlazoFijo />}>
              {" "}
            </Route>
            <Route path="prestamo" element={<Prestamo />}>
              {" "}
            </Route>
          </Route>
          <Route path="/depositos" element={<DepositPage />} />
          <Route path="/pagos" element={<PaymentPage />} />
          <Route path="/transferencias" element={<Transferencias />} />
          <Route path="/account" />
        </Route>
      </Routes>
    </Page>
  );
}
export default App;
