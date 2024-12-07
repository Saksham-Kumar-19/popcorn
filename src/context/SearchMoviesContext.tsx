import { createContext, useEffect, useState } from "react";
import { MovieProps } from "../types/movieType";
// import { tempMovieData } from "../data/movieData";

import API_KEY from "../config/config";

export interface SearchMoviesContextProps {
  movies: MovieProps[];
  loading: boolean;
  query: string;
  error: string;
  handleAddMovie: (movie: MovieProps) => void;
  handleSearchMovies: (search: string) => void;
}

const SearchMoviesContext = createContext<SearchMoviesContextProps | undefined>(
  undefined
);

// Create a provider
function SearchMoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleAddMovie(movie: MovieProps) {
    const newMovie: MovieProps = {
      ...movie,
    };

    setMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  function handleSearchMovies(search: string) {
    setQuery(search);

    console.log(query); // debug
  }

  useEffect(() => {
    if (query.trim() === "") {
      setLoading(false);
      // console.log("Query is empty, skipping fetch"); // debug

      return; // Exit early if the query is empty
    }

    const abortController = new AbortController(); // This is the abort controller instance for cancelling the fetch request when the component unmounts or the query changes (cleanup function)
    // console.log("I am outside the async function"); // debug

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        setMovies([]); // Clear the movies array before fetching new ones

        // console.log("I am inside the try block at the top"); // debug

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: abortController.signal } // Pass the abort signal to fetch
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        // console.log(data.Search); // debug

        if (data.Response === "False") {
          throw new Error("No movies found!");
        }

        // Add each movie individually
        data.Search.forEach((movie: MovieProps) => {
          handleAddMovie(movie);
        });

        console.log(data.Search); // debug

        setLoading(false);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "An unknown error occurred";

        if (!(error instanceof Error) || error.name !== "AbortError") {
          // Now we only handle non-abort errors
          setError(message);
        }

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    // console.log("The useEffect has executed"); // debug

    return () => abortController.abort(); // Cleanup function to cancel the request
  }, [query]);

  const contextValue = {
    movies,
    loading,
    query,
    error,
    handleAddMovie,
    handleSearchMovies,
  };

  return (
    <SearchMoviesContext.Provider value={contextValue}>
      {children}
    </SearchMoviesContext.Provider>
  );
}

export { SearchMoviesProvider, SearchMoviesContext };
