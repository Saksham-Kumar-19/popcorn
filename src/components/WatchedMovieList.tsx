import useWatched from "../hooks/useWatchedMovie";
import WatchedMovieItem from "./WatchedMovieItem";

function WatchedMovieList() {
  const { watched } = useWatched();

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
