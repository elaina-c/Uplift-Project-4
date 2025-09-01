import React, { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import AnimeCard from "../AnimeCard/AnimeCard";
import styles from "./RecommendAnime.module.css";

const RecommendAnime = () => {
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const { favorites } = useContext(FavoritesContext);

  const fetchRecommended = async (retry = 3) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/recommendations/anime?page=${page}`
      );
      if (res.status === 429 && retry > 0) {
        setTimeout(() => fetchRecommended(retry - 1), 1000);
        return;
      }
      const data = await res.json();
      if (data?.data) {
        const extracted = data.data.map((item) => item.entry[0]);
        setRecommendedAnime((prev) => {
          const combined = [...prev, ...extracted];
          return Array.from(
            new Map(combined.map((anime) => [anime.mal_id, anime])).values()
          );
        });
        setHasNextPage(data.pagination?.has_next_page);
      }
    } catch (err) {
      console.error("Failed to fetch recommended anime:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, [page]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>RECOMMENDED ANIME</h2>
      <div className={styles.scrollContainer}>
        {recommendedAnime.map((anime, index) => (
          <AnimeCard
            key={`${anime.mal_id}-${index}`}
            anime={anime}
            isFavorite={favorites.some((f) => f.mal_id === anime.mal_id)}
          />
        ))}
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}

      {!loading && hasNextPage && (
        <button
          className={styles.loadMore}
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
        >
          Load More →
        </button>
      )}
    </div>
  );
};

export default RecommendAnime;
