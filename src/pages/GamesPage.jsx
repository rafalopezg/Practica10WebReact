import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    loadGames();
  }, []);

  // Filtra los juegos basados en el término de búsqueda
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      {/* Encabezado */}
      <header className="py-16 bg-opacity-70 shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-wide text-white drop-shadow-lg">
            GameZone
          </h1>
          <p className="mt-4 text-lg text-gray-300">Descubre tus juegos favoritos</p>
        </div>
      </header>

      {/* Barra de Búsqueda */}
      <section className="mt-12 text-center">
        <input
          type="text"
          placeholder="Buscar juegos..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="p-2 w-full md:w-1/2 mx-auto rounded-lg border-2 border-blue-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Juegos Recomendados */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">Juegos Recomendados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-blue-400">{game.name}</h3>
                <p className="mt-2 text-gray-300">
                  {game.genres.map((genre) => genre.name).join(', ')}
                </p>
                <p className="mt-2 text-gray-500">{game.released}</p>
                <p className="mt-2 text-lg font-semibold text-yellow-400">
                  ⭐ {game.rating.toFixed(1)} / 5
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-black bg-opacity-70 py-6 text-center text-gray-400">
        <p>&copy; 2025 GameZone. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
