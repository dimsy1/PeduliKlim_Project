import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo-PeduliKlim';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 py-8 mt-48">
      <div className="container mx-auto px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-24">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-500 mt-2">
              Bersama kita jaga bumi dari perubahan iklim. Mari bergabung dan beraksi untuk lingkungan yang lebih baik.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link to="/" className="hover:text-green-500 transition">Beranda</Link>
            <Link to="/about" className="hover:text-green-500 transition">Tentang Kami</Link>
            <Link to="/education" className="hover:text-green-500 transition">Edukasi</Link>
            <Link to="/challenge" className="hover:text-green-500 transition">Challenge</Link>
            <Link to="/contact" className="hover:text-green-500 transition">Kontak</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition">
              <i className="ri-facebook-circle-line text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition">
              <i className="ri-twitter-line text-xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition">
              <i className="ri-instagram-line text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition">
              <i className="ri-linkedin-box-line text-xl"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 pt-4 text-center">
          <p className="text-sm text-gray-500">&copy; 2024 PeduliKlim. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
