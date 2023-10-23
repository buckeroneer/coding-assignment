import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { moviesSlice, starredSlice } from '../../store/index.js'
import { Movies } from '../index.js'
import './starred.scss'

const Starred = () => {

    const state = useSelector((state) => state);
    const { starred } = state;
    const { clearAllStarred } = starredSlice.actions;
    const [, setSearchParams] = useSearchParams();
    const { resetPageNumber, resetMovies, setDiscoverProcess } = moviesSlice.actions;

    const dispatch = useDispatch()

    function handleResetPage() {
      dispatch(resetPageNumber());
      dispatch(resetMovies());
      setSearchParams();
      dispatch(setDiscoverProcess())
    }

    function handleClearStarred() {
      dispatch(clearAllStarred())
    }

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <Movies movies={starred.starredMovies}/>
        <footer className="text-center">
          <button className="btn btn-primary" onClick={handleClearStarred}>Remove all starred</button>
        </footer>
      </div>)}

      {starred.starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link onClick={handleResetPage} to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
