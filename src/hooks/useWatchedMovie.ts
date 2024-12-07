import { useContext } from "react";
import {
  WatchedMoviesContext,
  WatchedMoviesContextProps,
} from "../context/WatchedMoviesContext";

function useWatchedMovie() {
  const context = useContext<WatchedMoviesContextProps | undefined>(
    WatchedMoviesContext
  );

  if (!context) {
    throw new Error("useWatched must be used within a WatchedProvider");
  }

  return context;
}

export default useWatchedMovie;
