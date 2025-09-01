import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <BrowserRouter basename="/Uplift-Project-4">
        <App />
      </BrowserRouter>
    </FavoritesProvider>
  </StrictMode>
);
