import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGamesByTag } from "../services/api";
import "../index.css"; 

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tag } = useParams(); // Obtenemos el tag desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    const loadGamesByTag = async () => {
      try {
        setLoading(true);
        const { results } = await fetchGamesByTag(tag); // Llamada API
        console.log("Juegos recibidos:", results); // Verificamos los juegos que recibimos
        setGames(results);
      } catch (error) {
        console.error("Error al cargar los juegos por etiqueta:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGamesByTag();
  }, [tag]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl bg-gray-900">
        Cargando juegos por etiqueta...
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl bg-gray-900">
        No se encontraron juegos para esta etiqueta.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-4xl font-semibold text-blue-400 text-center mb-8">{tag}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-64 object-cover transform transition duration-300 hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-2">{game.name}</h3>
              <p className="text-gray-300 text-base">
                <span className="font-semibold">Rating:</span> {game.rating}/5 ({game.ratings_count} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
