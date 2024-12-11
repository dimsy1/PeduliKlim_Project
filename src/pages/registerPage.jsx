import React from 'react';
import Logo from '../components/Logo-PeduliKlim';

const RegisterPage = () => {
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
          <form className="w-full md:w-1/2">
            <div className="email mb-4">
              <input
                type="text"
                placeholder="E-mail"
                className="w-full rounded-full p-3"
              />
            </div>
            <div className="username mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-full p-3"
              />
            </div>
            <div className="password mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-full p-3"
              />
            </div>
            <div className="password-ulang mb-4">
              <input
                type="password"
                placeholder="Masukkan ulang password"
                className="w-full rounded-full p-3"
              />
            </div>
            <div className="submit-button">
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
              >
                Daftar
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
