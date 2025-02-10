import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-semibold text-white mt-4">{game.name}</h2>
      <p className="text-gray-400">{game.genres.map(genre => genre.name).join(', ')}</p>
      <Link
        to={`/games/${game.id}`}
        className="mt-4 inline-block text-blue-400 hover:text-blue-600"
      >
        Ver más detalles
      </Link>
    </div>
  );
};

export default GameCard;
