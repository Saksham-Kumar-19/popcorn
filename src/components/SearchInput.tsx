import { useState, useRef, useEffect } from "react";
import useSearchMovies from "../hooks/useSearchMovies";

function SearchInput() {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSearchMovies } = useSearchMovies();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleQuerySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue.trim() === "") {
      // Optionally, set some error state here to notify the user
      // console.log("Search query cannot be empty."); // debug

      return; // Exit early if the input value is empty
    }

    handleSearchMovies(inputValue.trim()); // Trim to remove any leading/trailing whitespaces
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleQuerySubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button className="btn-search" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
