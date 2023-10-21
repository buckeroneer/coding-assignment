import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { moviesSlice, starredSlice } from '../../store/index.js'
import { Movie } from '../index.js'
import './starred.scss'

const Starred = () => {

    const state = useSelector((state) => state);
    const { starred, videoTrailer } = state;
    const { clearAllStarred } = starredSlice.actions;
    const { resetPageNumber } = moviesSlice.actions;
    const { isOpen } = videoTrailer;

    const dispatch = useDispatch()

    function handleResetPageNumber() {
      dispatch(resetPageNumber());
    }

    function handleClearStarred() {
      dispatch(clearAllStarred())
    }

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="row">
        {starred.starredMovies.map((movie) => (
          <Movie 
            movie={movie} 
            key={movie.id}
            isOpen={isOpen}
          />
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={handleClearStarred}>Remove all starred</button>
        </footer>
      </div>)}

      {starred.starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link onClick={handleResetPageNumber} to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
