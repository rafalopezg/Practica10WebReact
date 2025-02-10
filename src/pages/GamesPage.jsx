import React, { useState, useEffect } from 'react';
import { fetchGames } from '../services/api';
import { Link } from 'react-router-dom';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    loadGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="py-6 bg-blue-900 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Explorar Juegos</h1>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 p-2 rounded-lg w-4/5 sm:w-2/3 md:w-1/3 lg:w-1/4"
          />
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">{game.name}</h3>
                <Link
                  to={`/game/${game.id}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GamesPage;
