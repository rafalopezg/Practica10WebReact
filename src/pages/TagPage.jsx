"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchGamesByTag } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Pagination from "../components/Pagination"
import '../index.css'; 

const TagPage = () => {
  const { slug } = useParams()
  const [games, setGames] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const loadGamesByTag = async () => {
      const data = await fetchGamesByTag(slug, currentPage)
      setGames(data.results)
      setTotalPages(Math.ceil(data.count / 12))
    }
    loadGamesByTag()
  }, [slug, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900 text-white min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Juegos con tag: {slug}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
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
                <h2 className="text-xl font-bold text-blue-400">{game.name}</h2>
                <p className="mt-2 text-gray-300">Rating: {game.rating}/5</p>
                <p className="mt-2 text-gray-400">{game.genres?.map((genre) => genre.name).join(", ")}</p>
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>

      <Footer />
    </div>
  )
}

export default TagPage