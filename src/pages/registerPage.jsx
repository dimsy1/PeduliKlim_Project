import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo-PeduliKlim';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      alert('Registrasi berhasil! Anda dapat login sekarang.');
      navigate('/login'); // Arahkan ke halaman login setelah registrasi berhasil
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    }
  };

  return (
    <div className="register-page h-screen">
      {/* Logo */}
      <div className="header-logo absolute top-10 left-10 md:left-20">
        <Logo />
      </div>

      <div className="flex flex-col md:flex-row items-center bg-gradient-to-t from-green-100 to-white h-full">
        {/* Sisi Kiri */}
        <div className="left-side w-full md:w-1/2 flex flex-col justify-center items-center h-full px-6 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Daftar</h1>
          {/* Register Form */}
          <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`w-full rounded-full p-3 ${errors.username ? 'border-red-500' : ''}`}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className={`w-full rounded-full p-3 ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full rounded-full p-3 ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Masukkan ulang password"
                className="w-full rounded-full p-3"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>
            <div className="submit-button">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 rounded-full ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isLoading ? 'Memproses...' : 'Daftar'}
              </button>
            </div>
          </form>
        </div>

        {/* Sisi Kanan */}
        <div className="hidden md:flex bg-green-100 items-center justify-center w-full md:w-1/2 h-full">
          <img
            src="src/assets/register-illustration.png"
            alt="Register Illustration"
            className="w-3/4 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
