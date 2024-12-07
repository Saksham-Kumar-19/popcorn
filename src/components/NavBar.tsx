import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchInput from "./SearchInput";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchInput />
      <NumResults />
    </nav>
  );
}

export default NavBar;
