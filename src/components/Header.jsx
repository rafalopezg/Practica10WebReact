// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="py-12 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 shadow-lg">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold drop-shadow-lg">GameZoneRLG</h1>
        <p className="mt-4 text-2xl italic text-gray-300">
          Descubre tus juegos favoritos
        </p>
      </div>
    </header>
  );
};

export default Header;
