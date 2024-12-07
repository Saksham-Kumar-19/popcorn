import useMovies from "../hooks/useSearchMovies";

function NumResults() {
  const { movies } = useMovies();

  return (
    <p className="num-results">
      {/* Found <strong>{movies.length}</strong> results */}
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
