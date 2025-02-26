"use client"

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { fetchGames } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Pagination from "../components/Pagination"

const GamesPage = () => {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames(currentPage)
      setGames(data.results)
      setTotalPages(Math.ceil(data.count / 12))
    }
    loadGames()
  }, [currentPage])

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage })
    window.scrollTo(0, 0)
  }

  const toggleFavorite = (gameId) => {
    setFavorites((prev) => (prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]))
  }

  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      <Header />

      <section className="mt-12 text-center">
        <input
          type="text"
          placeholder="Buscar juegos..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="p-2 w-full md:w-1/2 mx-auto rounded-lg border-2 border-blue-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      <section className="mt-16 text-center container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">Juegos Recomendados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
            >
              <button
                onClick={() => toggleFavorite(game.id)}
                className={`absolute top-4 right-4 text-3xl transition duration-300 z-10 ${
                  favorites.includes(game.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                {favorites.includes(game.id) ? "❤️" : "🤍"}
              </button>

              <img
                src={game.background_image || "/placeholder.svg"}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-blue-400">{game.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {game.tags?.slice(0, 3).map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => navigate(`/tags/${tag.slug}`)}
                      className="px-2 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-gray-300">{game.genres?.map((genre) => genre.name).join(", ")}</p>
                <button
                  onClick={() => navigate(`/game/${game.id}`)}
                  className="mt-4 text-blue-500 hover:text-blue-400 transition"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>

      <Footer />
    </div>
  )
}

export default GamesPage

