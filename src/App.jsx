import React from 'react';
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
import AdminValidasiTantangan from './pages/adminValidasiTantangan';

// ProtectedRoute untuk halaman biasa
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// AdminRoute untuk halaman admin (role = 'admin')
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Pastikan role disimpan saat login
  return token && role === 'admin' ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Halaman User (dilindungi dengan ProtectedRoute) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tantangan"
          element={
            <ProtectedRoute>
              <TantanganPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/komunitas"
          element={
            <ProtectedRoute>
              <KomunitasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/akun"
          element={
            <ProtectedRoute>
              <AkunPage />
            </ProtectedRoute>
          }
        />

        {/* Halaman Admin (dilindungi dengan AdminRoute) */}
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/adminManajemenTantangan"
          element={
            <AdminRoute>
              <AdminManajemenTantangan />
            </AdminRoute>
          }
        />
        <Route
          path="/adminManajemenEdukasi"
          element={
            <AdminRoute>
              <AdminManajemenEdukasi />
            </AdminRoute>
          }
        />
        <Route
          path="/adminStatistik"
          element={
            <AdminRoute>
              <AdminStatistik />
            </AdminRoute>
          }
        />
        <Route
          path="/adminValidasiTantangan"
          element={
            <AdminRoute>
              <AdminValidasiTantangan />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
