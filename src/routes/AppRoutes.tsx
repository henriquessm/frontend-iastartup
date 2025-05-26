import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../pages/App';
import Simulacao from '../pages/Simulacao';
import Perfil from '../pages/Perfil';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simulacao" element={<Simulacao />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;