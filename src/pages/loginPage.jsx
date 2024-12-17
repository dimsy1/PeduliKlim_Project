import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo-PeduliKlim';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect jika user sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      if (role === 'admin') {
        navigate('/adminDashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validasi frontend
    if (!email || !password) {
      setErrorMessage('Email dan password harus diisi.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });

      const { token, user } = response.data;

      if (token && user) {
        // Simpan token dan role ke localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);

        // Arahkan berdasarkan role pengguna
        if (user.role === 'admin') {
          navigate('/adminDashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setErrorMessage('Gagal mendapatkan informasi pengguna.');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page h-screen">
      <div className="header-logo absolute top-10 left-10 md:left-20">
        <Logo />
      </div>

      <div className="flex flex-col md:flex-row items-center bg-gradient-to-t from-green-100 to-white h-full">
        <div className="left-side w-full md:w-1/2 flex flex-col justify-center items-center h-full px-6 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Masuk</h1>
          <form className="w-full md:w-1/2" onSubmit={handleLogin}>
            <div className="email mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-full p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <div className="submit-button">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 rounded-full ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-500">Belum terdaftar?</span>
            <a href="/register" className="underline text-blue-500 ml-2">
              buat akun
            </a>
          </div>
        </div>

        <div className="hidden md:flex bg-green-100 items-center justify-center w-full md:w-1/2 h-full">
          <img src="assets/login-illustration.png" alt="Login Illustration" className="w-3/4 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
