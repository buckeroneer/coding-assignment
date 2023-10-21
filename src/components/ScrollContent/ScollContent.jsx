import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Movies}  from "../index.js";

import numPageSlice from '../../store/numPageSlice.js'
import useMovieSearch from "../../hooks/useMovieSearch.js";

const ScrollContent = ({viewTrailer, closeCard, prevQuery}) => {
  const { numPage } = useSelector((state) => state)
  const { increasePageNumber } = numPageSlice.actions
  const dispatch = useDispatch()

  const { isLoading, isError, error, moviesFetched, hasNextPage } =
    useMovieSearch(prevQuery, numPage.pageNumber);

  const observer = useRef();

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          dispatch(increasePageNumber())
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, increasePageNumber, dispatch]
  );

  return (
    <div>
      <div className="movie-content">
        <Movies
          innerRef={lastMovieRef}
          movies={moviesFetched || []}
          viewTrailer={viewTrailer}
          closeCard={closeCard}
        />
        <h1>{isLoading && "Loading..."}</h1>
        <h1>{isError && error}</h1>
      </div>
    </div>
  );
};

export default ScrollContent;
