import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameDetail } from "../services/api";

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGameDetails = async () => {
      const data = await fetchGameDetail(id); // Usamos fetchGameDetail
      setGame(data);
      setLoading(false);
    };
    loadGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Cargando detalles...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Volver al inicio
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full rounded-xl shadow-xl"
        />
        <div>
          <h1 className="text-3xl font-bold text-blue-400">{game.name}</h1>
          <p className="mt-4">{game.description}</p>
          <div className="mt-4">
            <h2 className="text-xl text-gray-300">Géneros:</h2>
            {game.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-blue-300 hover:text-blue-500 mr-2"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
