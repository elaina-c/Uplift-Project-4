import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { getAnimeById, getAnimeEpisodes } from "../../api/jikan";
import styles from "./AnimeDetails.module.css";
import AnimeEpisodes from "../../components/AnimeEpisodes/AnimeEpisodes";
import BackToTop from "../../components/BackToTop/BackToTop";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();

  const isFavorite =
    anime && favorites.some((fav) => fav.mal_id === anime.mal_id);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await getAnimeById(id);
        setAnime(data);
        const eps = await getAnimeEpisodes(id);

        setEpisodes(eps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [id]);

  if (loading) return <p>Loading anime details...</p>;
  if (!anime) return <p>Anime not found.</p>;

  return (
    <div className={styles.container}>
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className={styles.image}
      />
      <h2 className={styles.h2}>{anime.title}</h2>

      <div className={styles.genres}>
        <strong>Genres: </strong>
        {anime.genres && anime.genres.length > 0
          ? anime.genres.map((g) => g.name).join(", ")
          : "N/A"}
      </div>

      <p className={styles.p}>{anime.synopsis}</p>

      <p className={styles.p}>Score: {anime.score ?? "N/A"}</p>
      <button
        className={isFavorite ? styles.favorited : ""}
        onClick={() => toggleFavorite(anime)}
      >
        {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
      </button>

      {anime.trailer && anime.trailer.youtube_id && (
        <div className={styles.trailer}>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
            title={`${anime.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h3>Episodes</h3>
      <AnimeEpisodes episodes={episodes} />
      <BackToTop />
      <button onClick={() => navigate("/search")} className={styles.backBtn}>
        ⬅ Back to Search
      </button>
    </div>
  );
};

export default AnimeDetails;
