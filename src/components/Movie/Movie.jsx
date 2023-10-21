import { useDispatch, useSelector } from "react-redux";

import { getMovieById } from "../../api/movies";
import { starredSlice, watchLaterSlice, videoTrailerSlice } from "../../store/index.js";
import placeholder from "../../assets/not-found-500X750.jpeg";

const Movie = ({ movie, handleModal, innerRef }) => {
  const state = useSelector((state) => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const { setVideoKey, resetVideoKey } = videoTrailerSlice.actions

  const dispatch = useDispatch();

  async function getMovie(id) {
    const request = getMovieById(id);
    request.then((response) => {
      const dataMovie = response.data;
      if (dataMovie.videos && dataMovie.videos.results.length) {
        const trailer = dataMovie.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        let key = trailer ? trailer.key : dataMovie.videos.results[0].key;
        dispatch(setVideoKey(key))
      }
    }).catch((error) => {
        console.log(error);
        console.log('An error occured during the trailer search...');
        dispatch(setVideoKey(''))
    })
  }

  async function viewTrailer(movie) {
    dispatch(resetVideoKey());
    await getMovie(movie.id);
    handleModal();
  };

  const myClickHandler = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove("opened");
  };

  return (
    <div
      ref={innerRef}
      className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2"
    >
      <div
        className="card"
        onClick={(e) => e.currentTarget.classList.add("opened")}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie)}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(e) => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
