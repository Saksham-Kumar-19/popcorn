import { useState, createContext, useEffect } from "react";
// import { tempWatchedData } from "../data/watchedData";
import { WatchedMovieProps } from "../types/watchedMovieType";

export interface WatchedMoviesContextProps {
  watched: WatchedMovieProps[];
  handleAddToWatched: (movie: WatchedMovieProps) => void;
  handleRemoveFromWatched: (imdbID: string) => void;
}

// Create a context
export const WatchedMoviesContext = createContext<
  WatchedMoviesContextProps | undefined
>(undefined);

function initialWatched(): WatchedMovieProps[] {
  const watched = localStorage.getItem("watched");
  return watched ? JSON.parse(watched) : [];
}

// Create a provider
function WatchedMoviesProvider({ children }: { children: React.ReactNode }) {
  const [watched, setWatched] = useState<WatchedMovieProps[]>(initialWatched);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  function handleAddToWatched(movie: WatchedMovieProps) {
    const newMovie: WatchedMovieProps = {
      ...movie,
    };

    setWatched((prevWatched) => [...prevWatched, newMovie]);

    // console.log(watched); // debug

    // localStorage.setItem("watched", JSON.stringify([...watched, newMovie]));
  }

  function handleRemoveFromWatched(imdbID: string) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== imdbID)
    );
  }

  const contextValue = {
    watched,
    handleAddToWatched,
    handleRemoveFromWatched,
  };

  return (
    <WatchedMoviesContext.Provider value={contextValue}>
      {children}
    </WatchedMoviesContext.Provider>
  );
}

export { WatchedMoviesProvider };
