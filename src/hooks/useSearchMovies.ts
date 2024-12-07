import { useContext } from "react";
import {
  SearchMoviesContext,
  SearchMoviesContextProps,
} from "../context/SearchMoviesContext";

function useSearchMovies() {
  const context = useContext<SearchMoviesContextProps | undefined>(SearchMoviesContext);

  if (!context) {
    throw new Error("useSearchMovies must be used within a MoviesProvider");
  }

  return context;
}

export default useSearchMovies;
