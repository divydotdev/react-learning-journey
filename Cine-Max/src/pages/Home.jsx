import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";


function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(popularMovies.length === 0 ? "No movies available right now." : null);
      } catch (err) {
        console.error(err);
        setMovies([]);
        setError("Set VITE_TMDB_API_KEY to load live movie data.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(searchResults.length > 0 ? null : "No movies matched your search.");
    } catch (err) {
      console.error(err);
      setMovies([]);
      setError("Search failed. Check your TMDB API key and network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-eyebrow">Streaming-ready movie browser</p>
        <h1>Discover your next favorite movie.</h1>
        <p className="hero-copy">
          Search TMDB’s live catalog, save the titles you like, and deploy this app with your own API key.
        </p>
      </section>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <h2>No Movies Found</h2>
          <p>{error || "Try another search or check your TMDB API key."}</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
