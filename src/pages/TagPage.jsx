import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGamesByTag } from '../services/api'; // Asegúrate de tener esta función en tu API

const TagPage = () => {
  const { slug } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGamesByTag = async () => {
      const data = await fetchGamesByTag(slug); // Llamada a la API por tag
      setGames(data);
    };
    loadGamesByTag();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Juegos con el tag: {slug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">{game.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagPage;
