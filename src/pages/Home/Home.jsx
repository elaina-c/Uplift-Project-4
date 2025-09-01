import React, { useEffect, useState } from "react";
import { getLatestAnime } from "../../api/jikan";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import styles from "./Home.module.css";
import Intro from "../../components/Intro/Intro";
import BackToTop from "../../components/BackToTop/BackToTop";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAnime = async (pageNum = 1) => {
    setLoading(true);
    const { anime, hasNext } = await getLatestAnime(pageNum);

    setAnimeList(anime);
    setHasNext(hasNext);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnime(page);
  }, [page]);

  return (
    <div className={styles.container}>
      <Intro />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {animeList.map((anime, index) => (
            <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        {page > 1 && (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className={styles.backBtn}
            disabled={loading}
          >
            ← Back
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={styles.nextBtn}
            disabled={loading}
          >
            Next →
          </button>
        )}
      </div>
      <BackToTop />
    </div>
  );
};

export default Home;
