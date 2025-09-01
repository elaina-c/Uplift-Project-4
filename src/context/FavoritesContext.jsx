import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (anime) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.mal_id === anime.mal_id);

      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.mal_id !== anime.mal_id);
      } else {
        return [...prev, anime];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
