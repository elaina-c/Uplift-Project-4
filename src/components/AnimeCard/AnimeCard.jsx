import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import styles from "./AnimeCard.module.css";

const AnimeCard = ({ anime }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites?.some((fav) => fav.mal_id === anime.mal_id);

  return (
    <div className={styles.card}>
      <Link to={`/anime/${anime.mal_id}`} className={styles.link}>
        <img
          src={
            anime.images?.jpg?.image_url || "https://via.placeholder.com/150"
          }
          alt={anime.title}
          className={styles.image}
        />
        <h3 className={styles.title}>{anime.title}</h3>
      </Link>

      <button
        className={`${styles.favoriteBtn} ${
          isFavorite ? styles.favorited : ""
        }`}
        onClick={() => toggleFavorite(anime)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default AnimeCard;
