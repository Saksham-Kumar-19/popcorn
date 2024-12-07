import Movie from "./Movie";
import useMovies from "../hooks/useSearchMovies";

function MovieList() {
  const { movies } = useMovies();

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
