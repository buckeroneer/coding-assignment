import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { moviesSlice, watchLaterSlice } from '../../store/index.js'
import { Movies } from '../index.js'
import './watchLater.scss'

const WatchLater = () => {

    const state = useSelector((state) => state)
    const { watchLater } = state
    const { removeAllWatchLater } = watchLaterSlice.actions
    const { resetPageNumber } = moviesSlice.actions

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
        <Movies movies={watchLater.watchLaterMovies}/>
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
