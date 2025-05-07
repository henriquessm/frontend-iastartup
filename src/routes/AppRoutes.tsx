import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../pages/App';
import Simulacao from '../pages/Simulacao';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simulacao" element={<Simulacao />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;