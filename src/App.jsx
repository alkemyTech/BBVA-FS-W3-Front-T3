import "./App.css";
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Page from "./pages/index.jsx";

function App() {
  return (
     <Page>
       <Routes>
        <Route path="/" element={<LoginPage/>}/>  
        </Routes>
        </Page>
  );
}
export default App;

