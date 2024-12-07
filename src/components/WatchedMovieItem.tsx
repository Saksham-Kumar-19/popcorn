import useWatchedMovie from "../hooks/useWatchedMovie";
import { WatchedMovieProps } from "../types/watchedMovieType";

interface WatchedMovieItemProps {
  movie: WatchedMovieProps;
}

function WatchedMovieItem({ movie }: WatchedMovieItemProps) {
  const { handleRemoveFromWatched } = useWatchedMovie();

  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => handleRemoveFromWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovieItem;
