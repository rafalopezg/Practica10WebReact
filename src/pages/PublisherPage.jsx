import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPublisherDetails } from '../services/api'; // Asegúrate de tener esta función en tu API

const PublisherPage = () => {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);

  useEffect(() => {
    const loadPublisherDetails = async () => {
      const data = await fetchPublisherDetails(id); // Llamada a la API por publisher
      setPublisher(data);
    };
    loadPublisherDetails();
  }, [id]);

  if (!publisher) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Publisher: {publisher.name}</h1>
      <p className="mt-4 text-xl">Información sobre el publisher: {publisher.description}</p>
      <h2 className="mt-6 text-2xl font-semibold">Juegos de este Publisher:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {publisher.games.map((game) => (
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

export default PublisherPage;
