import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetail } from '../services/api';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      const data = await fetchGameDetail(id);
      setGame(data);
    };
    loadGameDetails();
  }, [id]);

  if (!game)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Cargando detalles...
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      {/* Encabezado */}
      <header className="py-16 bg-gradient-to-r from-purple-900 to-blue-700 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold drop-shadow-lg">{game.name}</h1>
          <p className="mt-4 text-xl text-gray-300">
            {game.genres && game.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-96 object-cover rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-400">Fecha de lanzamiento</h2>
              <p className="text-xl">{game.released}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-blue-400">Plataformas</h2>
              {game.platforms && game.platforms.length > 0 ? (
                <ul className="list-disc ml-6 space-y-2">
                  {game.platforms.map((platform) => (
                    <li key={platform.platform.id} className="text-xl">
                      {platform.platform.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xl">Plataformas no disponibles</p>
              )}
            </div>

            </div>
            </div>
            <div className='mt-5  '>
              <h2 className="text-2xl font-semibold text-blue-400">Descripción</h2>
              <p className="text-lg text-gray-300">{game.description_raw}</p>
            </div>
      </main>

      {/* Pie de Página */}
      <footer className="bg-gray-800 py-6 text-center text-gray-400">
        <p>&copy; 2025 GameZoneRLG. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default GameDetailPage;
