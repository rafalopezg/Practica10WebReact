import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    }, 5000);
    return () => clearInterval(interval);
  }, [games]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      {/* Encabezado */}
      <Header />

      {/* Carrusel de Juegos Populares */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">Juegos Populares</h2>
        <div className="relative w-full flex justify-center">
          {games.length > 0 && (
            <img
              src={games[currentIndex].background_image}
              alt={games[currentIndex].name}
              className="w-full md:w-2/3 lg:w-1/2 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
            />
          )}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="mt-16 text-center mb-">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400">Explora y Busca Juegos</h2>
        <p className="mt-4 text-lg text-gray-300">
          Usa nuestro buscador para encontrar juegos específicos o explora los más populares.
        </p>
      </section>

      {/* Pie de Página */}
      <Footer />
    </div>
  );
};

export default HomePage;
