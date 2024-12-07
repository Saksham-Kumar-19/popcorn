import { useContext } from "react";

import {
  MovieDetailsContext,
  MovieDetailsContextProps,
} from "../context/MovieDetailsContext";

function useMovieDetails() {
  const context = useContext<MovieDetailsContextProps | undefined>(
    MovieDetailsContext
  );

  if (!context) {
    throw new Error("useMovieDetails must be used within a MoviesProvider");
  }

  return context;
}

export default useMovieDetails;
