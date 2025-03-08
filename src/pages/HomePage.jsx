import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../services/api";
import "../index.css";


const HomePage = () => {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        const { results } = await fetchGames();
        console.log("Juegos cargados:", results); // Verifica los resultados
        setGames(results);
        setLoading(false); // Actualiza el estado de carga
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
        setLoading(false); // En caso de error, termina la carga
      }
    };
    loadGames();
  }, []);

  const nextGame = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Cargando juegos...
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        No se encontraron juegos.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-blue-900 min-h-screen">
      <div className="relative">
        <img
          src={games[currentIndex].background_image}
          alt={games[currentIndex].name}
          className="w-full md:w-2/3 lg:w-1/2 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-4">
          <button
            onClick={prevGame}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-blue-500 transition"
          >
            ←
          </button>
          <button
            onClick={nextGame}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-blue-500 transition"
          >
            →
          </button>
        </div>
      </div>
      <div className="text-center mt-8">
        <h1 className="text-4xl font-semibold text-blue-400 mb-4">
          {games[currentIndex].name}
        </h1>
        <p className="text-lg text-gray-300 mb-6">{games[currentIndex].description}</p>
        <button
          onClick={() => navigate(`/game/${games[currentIndex].id}`)}
          className="mt-4 text-blue-500 hover:text-blue-400 transition font-semibold"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default HomePage;
