const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const buildUrl = (path, query = "") => {
  if (!API_KEY) {
    throw new Error("Missing TMDB API key");
  }

  return `${BASE_URL}${path}?api_key=${API_KEY}${query}`;
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(buildUrl("/movie/popular"));
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      buildUrl("/search/movie", `&query=${encodeURIComponent(query)}`)
    );
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Error searching movies:", err);
    return [];
  }
};
