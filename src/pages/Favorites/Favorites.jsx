import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import styles from "./Favorites.module.css";
import BackToTop from "../../components/BackToTop/BackToTop";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>MY FAVORITES</h2>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>You haven't added any favorites yet 😢</p>
          <img
            src="https://i.imgur.com/3Q8ZQnD.png"
            alt="Empty state"
            className={styles.emptyImage}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default Favorites;
