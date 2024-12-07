import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedMovieSummary from "./WatchedMovieSummary";
import ErrorMessage from "./ErrorMessage";

import { TailSpin } from "react-loader-spinner";
import MovieDetails from "./MovieDetails";
import useMovieDetails from "../hooks/useMovieDetails";
import useSearchMovies from "../hooks/useSearchMovies";

function Main() {
  const { error, selectedID } = useMovieDetails();
  const { loading } = useSearchMovies();

  return (
    <main className="main">
      <Box>
        {loading && (
          <div className="loader-container">
            <TailSpin height="50" width="50" color="blue" ariaLabel="loading" />
          </div>
        )}

        {!loading && !error && <MovieList />}

        {error && <ErrorMessage errorMsg={error} />}
      </Box>

      <Box>
        {selectedID ? (
          <MovieDetails />
        ) : (
          <>
            <WatchedMovieSummary />
            <WatchedMovieList />
          </>
        )}
      </Box>
    </main>
  );
}

export default Main;
