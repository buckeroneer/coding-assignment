import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import numPageSlice from '../../store/numPageSlice'
import watchLaterSlice from '../../store/watchLaterSlice'
import { Movie } from '../index.js'
import './watchLater.scss'

const WatchLater = ({viewTrailer}) => {

    const state = useSelector((state) => state)
    const { watchLater } = state
    const { removeAllWatchLater } = watchLaterSlice.actions
    const { resetPageNumber } = numPageSlice.actions
    const dispatch = useDispatch()

    function handleResetPageNumber() {
      dispatch(resetPageNumber());
    }

    function handleClearWatchLater() {
      dispatch(removeAllWatchLater())
    }

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.watchLaterMovies.length > 0 && (<div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="row">
        {watchLater.watchLaterMovies.map((movie) => (
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={handleClearWatchLater}>Empty list</button>
        </footer>
      </div>)}

      {watchLater.watchLaterMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link onClick={handleResetPageNumber} to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default WatchLater
