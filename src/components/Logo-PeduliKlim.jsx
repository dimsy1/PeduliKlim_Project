import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <Link to='/' className="flex gap-2 items-center">
        <img src="src/assets/PeduliKlimLogo.png" alt="PeduliKlim Logo" className="h-8" />
        <span className="text-green-600 text-xl font-bold">
          <span className="text-gray-900">Peduli</span>Klim
        </span>
      </Link>
    </div>
  );
};

export default Logo;
