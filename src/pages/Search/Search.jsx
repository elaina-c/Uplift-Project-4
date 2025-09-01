import React, { useState, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { searchAnime } from "../../api/jikan";
import AnimeFilter from "../../components/AnimeFilter/AnimeFilter";
import Romance from "../../components/AnimeGenre/Romance";
import Isekai from "../../components/AnimeGenre/Isekai";
import RecommendAnime from "../../components/AnimeGenre/RecommendAnime";
import Intro from "../../components/Intro/Intro";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import styles from "./Search.module.css";
import BackToTop from "../../components/BackToTop/BackToTop";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { favorites } = useContext(FavoritesContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setError(null);
    setPage(1);

    try {
      const { anime, hasNext } = await searchAnime(query, 1);
      let filteredResults = anime;

      if (genre) {
        filteredResults = filteredResults.filter((a) =>
          a.genres.some((g) => g.mal_id.toString() === genre)
        );
      }

      if (year) {
        filteredResults = filteredResults.filter((a) => {
          const aired = a.aired?.from;
          return aired && aired.startsWith(year);
        });
      }

      setResults(filteredResults);
      setHasNextPage(hasNext);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasNextPage) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const { anime, hasNext } = await searchAnime(query, nextPage);

      let filteredResults = anime;

      if (genre) {
        filteredResults = filteredResults.filter((a) =>
          a.genres.some((g) => g.mal_id.toString() === genre)
        );
      }

      if (year) {
        filteredResults = filteredResults.filter((a) => {
          const aired = a.aired?.from;
          return aired && aired.startsWith(year);
        });
      }

      setResults((prev) => [...prev, ...filteredResults]); // ✅ append
      setPage(nextPage);
      setHasNextPage(hasNext);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Intro />

      <h1 className={styles.h1}>SEARCH YOUR ANIME</h1>

      <AnimeFilter
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
      />

      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.resultsGrid}>
        {Array.isArray(results) && results.length > 0
          ? results.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                isFavorite={favorites.some((f) => f.mal_id === anime.mal_id)}
              />
            ))
          : hasSearched && !loading && <p>No results found.</p>}
      </div>

      {hasNextPage && !loading && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      )}

      <div className={styles.extraSections}>
        <RecommendAnime />
        <Romance />
        <Isekai />
        <BackToTop />
      </div>
    </div>
  );
};

export default Search;
