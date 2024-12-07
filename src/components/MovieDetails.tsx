import useMovieDetails from "../hooks/useMovieDetails";
import useWatchedMovie from "../hooks/useWatchedMovie";
import StarRating from "./StarRating/StarRating";
import { MovieDetailsProps } from "../types/movieDetailsType";

import { TailSpin } from "react-loader-spinner";

function MovieDetails() {
  const { handleClearSelectedMovie, movieDetails, loading, starRating } =
    useMovieDetails();

  const { handleAddToWatched, watched } = useWatchedMovie();

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="loader-container">
        <TailSpin height="50" width="50" color="blue" ariaLabel="loading" />
      </div>
    );
  }

  // If not loading but no movie details are available, you can return null or some placeholder
  if (!movieDetails) {
    return <div>No movie details available.</div>;
  }

  function transformMovieDetailsToWatched(movieDetails: MovieDetailsProps) {
    return {
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      Year: movieDetails.Year || "N/A",
      Poster: movieDetails.Poster,
      runtime: parseInt(movieDetails.Runtime, 10) || 0,
      imdbRating: movieDetails.imdbRating,
      userRating: starRating,
    };
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  // Derived state
  const isAlreadyAdded: boolean = watched.some(
    (movie) => movie.imdbID === movieDetails.imdbID
  );
  const checkMovieRating = watched.find((movie) => {
    if (movie.imdbID === movieDetails.imdbID) {
      return movie.userRating;
    }
  });

  function handleAddClick() {
    // console.log(movieDetails); // debug

    // Check if the movie details are available before adding to the watched list to avoid errors in the future if the movie details are not available for some reason (e.g. network error) and the user clicks the add button multiple times in a row before the details are available
    if (movieDetails) {
      // Check if the movie already exists in the watched list

      if (isAlreadyAdded) {
        // console.log("Movie already added to the watched list."); // debug

        return;
      }

      const watchedMovie = transformMovieDetailsToWatched(movieDetails);
      handleAddToWatched(watchedMovie);
      handleClearSelectedMovie(); // Clear the selected movie after adding it to the watched list
    }
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleClearSelectedMovie}>
          &larr;
        </button>

        <img src={poster} alt={`Poster of ${title} Movie`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isAlreadyAdded ? (
            <>
              <StarRating maxRating={10} size={24} />
              <button className="btn-add" onClick={handleAddClick}>
                + Add to Watched List
              </button>
            </>
          ) : (
            <p>
              You have already rated this movie {" "}
              <strong>{checkMovieRating?.userRating}</strong> ⭐
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>

      {/* {selectedID} */}
    </div>
  );
}

export default MovieDetails;
