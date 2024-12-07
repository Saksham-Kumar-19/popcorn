import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { WatchedMoviesProvider } from "./context/WatchedMoviesContext";
import { MovieDetailsProvider } from "./context/MovieDetailsContext.tsx";
import { SearchMoviesProvider } from "./context/SearchMoviesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WatchedMoviesProvider>
      <MovieDetailsProvider>
        <SearchMoviesProvider>
          <App />
        </SearchMoviesProvider>
      </MovieDetailsProvider>
    </WatchedMoviesProvider>
  </React.StrictMode>
);
