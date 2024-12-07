import useWatched from "../hooks/useWatchedMovie";

function average(arr: number[]): number {
  return arr.reduce((acc: number, cur: number) => acc + cur / arr.length, 0);
}

function WatchedMovieSummary() {
  const { watched } = useWatched();

  const avgImdbRating: number = average(
    watched.map((movie) => movie.imdbRating)
  );
  const avgUserRating: number = average(
    watched.map((movie) => movie.userRating)
  );
  const avgRuntime: number = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedMovieSummary;
