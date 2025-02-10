// API key directamente en el código (no recomendado para producción)
const API_KEY = '2f34be5d025644d3a4a7d9fe51174531';

// Función para obtener los juegos, con soporte para búsqueda y paginación
const fetchGames = async (query = "", page = 1) => {
  try {
    const url = query
      ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page=${page}`
      : `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;
    
    const response = await fetch(url);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results; // Devuelve los juegos encontrados
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    return []; // Retorna un array vacío si ocurre un error
  }
};

// Función para obtener los detalles de un juego específico
const fetchGameDetail = async (id) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data; // Devuelve los detalles del juego
  } catch (error) {
    console.error('Error al obtener el detalle del juego:', error);
    return null; // Retorna null si ocurre un error
  }
};

// Exporta las funciones
export { fetchGames, fetchGameDetail };
