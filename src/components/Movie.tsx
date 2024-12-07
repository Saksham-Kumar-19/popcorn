import useMovieDetails from "../hooks/useMovieDetails";

interface MovieProps {
  movie: {
    Poster: string;
    Title: string;
    Year: string;
    imdbID: string;
  };
}

function Movie({ movie }: MovieProps) {
  const { handleSelectMovie } = useMovieDetails();

  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
