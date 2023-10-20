import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import numPageSlice from '../slices/numPageSlice'

import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const { resetPageNumber } = numPageSlice.actions
  const dispatch = useDispatch()

  const cleanSearchInput = () => {
    let searchInput = document.querySelector("input[class='form-control rounded']");
    searchInput.value = ""
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => {
        searchMovies("");
        cleanSearchInput();
        dispatch(resetPageNumber())
        }}>
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
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          onKeyUp={(e) => searchMovies(e.target.value)}
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
