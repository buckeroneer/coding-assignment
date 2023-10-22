import {
  Link,
  NavLink,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moviesSlice from "../../store/moviesSlice";

import "./header.scss";

const Header = () => {
  const { starred, movieStore } = useSelector((state) => state);
  const starredMovies = starred.starredMovies;

  const { discoverProcess } = movieStore;
  const {
    resetMovies,
    resetPageNumber,
    setDiscoverProcess,
    unsetDiscoverProcess,
  } = moviesSlice.actions;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function cleanSearchInput() {
    let searchInput = document.querySelector(
      "input[class='form-control rounded']"
    );
    searchInput.value = "";
  }

  function getSearchResults(query) {
    if (searchQuery !== query) {
      dispatch(resetPageNumber());
      dispatch(resetMovies());
      if (query !== "") {
        setSearchParams(createSearchParams({ search: query }));
        dispatch(unsetDiscoverProcess());
      } else {
        setSearchParams(createSearchParams());
        dispatch(setDiscoverProcess());
      }
    }
  }

  function searchMovies(query) {
    if (query !== "") {
      dispatch(unsetDiscoverProcess())
    }
    navigate("/");
    getSearchResults(query);
  }

  function handleHomeReset() {
    if (searchQuery || !discoverProcess) {
      cleanSearchInput();
      dispatch(resetPageNumber());
      dispatch(resetMovies());
      searchMovies("");
    }
    window.scrollTo(0, 0);
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleHomeReset}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink
          to="/watch-later"
          className="nav-fav"
          data-testid="nav-fav-header"
        >
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          onChange={(e) => searchMovies(e.target.value)}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
