// API key directamente en el código (no recomendado para producción)
const API_KEY = '2f34be5d025644d3a4a7d9fe51174531';

export const fetchGames = async (page = 1, pageSize = 12) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`)

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const data = await response.json()
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    }
  } catch (error) {
    console.error("Error fetching games:", error)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export const fetchGamesByTag = async (tag, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&tags=${tag}&page=${page}&page_size=${pageSize}`,
    )

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const data = await response.json()
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    }
  } catch (error) {
    console.error("Error fetching games by tag:", error)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export const fetchPublisherDetails = async (id) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("Error fetching publisher details:", error)
    return null
  }
}

export const fetchGameDetail = async (id) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("Error fetching game details:", error)
    return null
  }
}
