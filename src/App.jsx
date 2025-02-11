import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';

const App = () => {
  return (
    <Router>
      <div>
        {/* Menú de Navegación */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <a href="/" className="mr-4 text-lg hover:text-blue-400">
                Inicio
              </a>
              <a href="/games" className="mr-4 text-lg hover:text-blue-400">
                Todos los Juegos
              </a>
            </div>
          </div>
        </nav>

        {/* Rutas de las Páginas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
