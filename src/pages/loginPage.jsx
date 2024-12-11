import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo-PeduliKlim';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Logika sederhana untuk validasi (bisa ditambah sesuai kebutuhan)
    if (username === 'user' && password === 'password') {
        // Redirect ke dashboard jika login berhasil sebagai user
        navigate('/dashboard');
    } else if (username === 'admin' && password === 'password') {
        // Redirect ke dashboard admin jika login berhasil sebagai admin
        navigate('/adminDashboard');
    } else {
        // Tampilkan alert jika username atau password salah
        alert('Username atau password salah!');
    }
  };


  return (
    <div className="login-page h-screen">
      {/* Logo */}
      <div className="header-logo absolute top-10 left-10 md:left-20">
        <Logo />
      </div>

      <div className="flex flex-col md:flex-row items-center bg-gradient-to-t from-green-100 to-white h-full">
        {/* Sisi Kiri */}
        <div className="left-side w-full md:w-1/2 flex flex-col justify-center items-center h-full px-6 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Masuk</h1>
          {/* Login Form */}
          <form className="w-full md:w-1/2" onSubmit={handleLogin}>
            <div className="username mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-full p-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="submit-button">
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
              >
                Masuk
              </button>
            </div>
          </form>

          <div className='mt-8 text-center'>
            <span className='text-gray-500'>Belum terdaftar?</span>
            <a href='/register' className='underline text-blue-500 ml-2'>buat akun</a>
          </div>
        </div>

        {/* Sisi Kanan */}
        <div className="hidden md:flex bg-green-100 items-center justify-center w-full md:w-1/2 h-full">
          <img
            src="src/assets/login-illustration.png"
            alt="Login Illustration"
            className="w-3/4 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
