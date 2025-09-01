import React, { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import AnimeCard from "../AnimeCard/AnimeCard";
import styles from "./Isekai.module.css";

const Isekai = () => {
  const [isekaiAnime, setIsekaiAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const { favorites } = useContext(FavoritesContext);

  const fetchIsekai = async (retry = 3) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?themes=62&order_by=popularity&sort=asc&page=${page}`
      );
      if (res.status === 429 && retry > 0) {
        setTimeout(() => fetchIsekai(retry - 1), 1000);
        return;
      }
      const data = await res.json();
      if (data?.data) {
        setIsekaiAnime((prev) => {
          const combined = [...prev, ...data.data];
          return Array.from(
            new Map(combined.map((a) => [a.mal_id, a])).values()
          );
        });
        setHasNextPage(data.pagination?.has_next_page);
      }
    } catch (err) {
      console.error("Failed to fetch isekai anime:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIsekai();
  }, [page]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ISEKAI ANIME</h2>
      <div className={styles.scrollContainer}>
        {isekaiAnime.map((anime, index) => (
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

export default Isekai;
