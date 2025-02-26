"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPublisherDetails } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"

const PublisherPage = () => {
  const { id } = useParams()
  const [publisher, setPublisher] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadPublisherDetails = async () => {
      const data = await fetchPublisherDetails(id)
      setPublisher(data)
      setLoading(false)
    }
    loadPublisherDetails()
  }, [id])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-2xl">Cargando...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{publisher.name}</h1>

        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acerca del Publisher</h2>
          <p className="text-gray-300">{publisher.description || "No hay descripción disponible."}</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Juegos de {publisher.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publisher.games?.map((game) => (
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
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PublisherPage

