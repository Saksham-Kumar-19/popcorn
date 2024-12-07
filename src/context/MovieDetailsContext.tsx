import { useState, createContext, useEffect } from "react";
import { MovieDetailsProps } from "../types/movieDetailsType";

import API_KEY from "../config/config";
import useKeyDownListener from "../hooks/useKeyDownListener";

export interface MovieDetailsContextProps {
  error: string;
  selectedID: string | null;
  handleSelectMovie: (id: string) => void;
  handleClearSelectedMovie: () => void;
  movieDetails: MovieDetailsProps | null;
  starRating: number;
  tempRating: number;
  handleSetStarRating: (rating: number) => void;
  handleSetStarTempRating: (rating: number) => void;
  loading: boolean;
}

// Create a context
export const MovieDetailsContext = createContext<
  MovieDetailsContextProps | undefined
>(undefined);

// Create a provider
function MovieDetailsProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(
    null
  );

  const [starRating, setStarRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchMovieDetails() {
      if (!selectedID) return; // If no movie is selected, exit early

      handleResetRating(); // Reset the rating when a new movie is selected

      setError(""); // Reset error message to empty string before fetching data from API

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`,
          { signal: abortController.signal } // Pass the abort signal to fetch
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        // console.log(data); // debug

        if (data.Response === "False") {
          throw new Error("No movie found!");
        }

        setMovieDetails(data);
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

    fetchMovieDetails();

    return () => abortController.abort();
  }, [selectedID]);

  useEffect(() => {
    // Guard clause
    if (!movieDetails?.Title || !selectedID) return;

    document.title =
      `Movie | ${movieDetails?.Title}` || "usePopcorn - Movie Finder";

    // Cleanup function
    return () => {
      document.title = "usePopcorn - Movie Finder";
      // console.log(`Cleanup effect for movie: ${movieDetails.Title}`);
    };
  }, [movieDetails, selectedID]);

  /*
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && selectedID) {
        handleClearSelectedMovie();
      }
    });

    // Cleanup function
    return () =>
      document.removeEventListener("keydown", (event) => {
        if (event.code === "Escape" && selectedID) {
          handleClearSelectedMovie();
        }
      });
  }, [selectedID]);
  */

  // Use the custom hook for handling the Escape key
  useKeyDownListener({
    action: handleClearSelectedMovie,
    keys: ["Escape"],
  });

  function handleSelectMovie(movieID: string) {
    setSelectedID(movieID);
  }

  function handleClearSelectedMovie() {
    setSelectedID(null);
  }

  function handleSetStarRating(rating: number) {
    setStarRating(rating);
    // setUserRating(rating);
  }

  function handleSetStarTempRating(rating: number) {
    setTempRating(rating);
  }

  function handleResetRating() {
    setStarRating(0);
    setTempRating(0);
  }

  const contextValue = {
    error,
    selectedID,
    handleSelectMovie,
    handleClearSelectedMovie,
    movieDetails,
    starRating,
    tempRating,
    handleSetStarRating,
    handleSetStarTempRating,
    loading,
  };

  return (
    <MovieDetailsContext.Provider value={contextValue}>
      {children}
    </MovieDetailsContext.Provider>
  );
}

export { MovieDetailsProvider };
