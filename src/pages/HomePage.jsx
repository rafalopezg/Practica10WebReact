import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    loadGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [games]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen">
      {/* Encabezado */}
      <header className="py-12 bg-black bg-opacity-70 shadow-2xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">GameZone</h1>
          <p className="mt-4 text-lg sm:text-2xl italic text-gray-300">
            Descubre tus juegos favoritos
          </p>
        </div>
      </header>

      {/* Carrusel de Juegos Populares */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-blue-400 mb-8">Juegos Populares</h2>
        <div className="relative w-full flex justify-center">
          {games.length > 0 && (
            <img
              src={games[currentIndex].background_image}
              alt={games[currentIndex].name}
              className="w-80 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto rounded-xl shadow-lg object-cover transition-opacity duration-500"
            />
          )}
        </div>
      </section>

      {/* Funcionalidades del Sitio */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400">Explora y Busca Juegos</h2>
        <p className="mt-4 text-lg text-gray-300">
          Usa nuestro buscador para encontrar juegos específicos o explora los más populares.
        </p>
      </section>

      {/* Pie de Página */}
      <footer className="bg-black bg-opacity-70 py-6 text-center text-gray-400">
        <p>&copy; 2025 GameZone. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
