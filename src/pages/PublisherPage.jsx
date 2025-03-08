import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPublisherDetails } from "../services/api";

const PublisherPage = () => {
  const { id } = useParams();
  const [publisher, setPublisher] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPublisherDetails = async () => {
      setLoading(true);
      const data = await fetchPublisherDetails(id);
      setPublisher(data);
      setLoading(false);
    };
    loadPublisherDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Cargando publisher...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-blue-400">{publisher.name}</h1>
      <div className="mt-4">
        <h2 className="text-xl text-gray-300">Juegos:</h2>
        {publisher.games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-400">{game.name}</h3>
              <p className="mt-2 text-gray-300">
                Rating: {game.rating}/5 ({game.ratings_count} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublisherPage;
