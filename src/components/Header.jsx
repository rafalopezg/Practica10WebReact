import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Videojuegos Explorer</h1>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-300">Inicio</Link>
            </li>
            <li>
              <Link to="/games" className="hover:text-blue-300">Todos los juegos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
