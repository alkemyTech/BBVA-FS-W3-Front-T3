import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Page from "./pages/index.jsx";
import RegisterPage from "./Components/auth/RegisterPage";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Page>
  );
}
export default App;

