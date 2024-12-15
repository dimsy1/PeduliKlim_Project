import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import LandingPage from './pages/landingPage';
import DashboardPage from './pages/dashboard';
import TantanganPage from './pages/tantanganPage';
import KomunitasPage from './pages/edukasiPage';
import AkunPage from './pages/akunPage';
import AdminDashboard from './pages/adminDashboard';
import AdminStatistik from './pages/adminStatistik';
import AdminManajemenTantangan from './pages/adminManajemenTantangan';
import AdminManajemenEdukasi from './pages/adminManajemenEdukasi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/tantangan' element={<TantanganPage />} />
        <Route path='/komunitas' element={<KomunitasPage />} />
        <Route path='/akun' element={<AkunPage />} />

        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/adminManajemenTantangan' element={<AdminManajemenTantangan />} />
        <Route path='/adminManajemenEdukasi' element={<AdminManajemenEdukasi />} />
        <Route path='/adminStatistik' element={<AdminStatistik />} />
      </Routes>
    </Router>
  );
}

export default App;
