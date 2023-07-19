import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Deposit from "./components/deposit/Deposit";
import Page from "./pages/index.jsx";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/depositos" element={<Deposit/>} />
      </Routes>
    </Page>
  );
}
export default App;
