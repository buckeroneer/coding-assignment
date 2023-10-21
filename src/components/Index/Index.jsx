import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Movies }  from "../index.js";

import { moviesSlice } from '../../store/index.js'
import useMovieSearch from "./hooks/useMovieSearch.js";

const Index = () => {
    const { movieStore } = useSelector((state) => state)
    const { movies, hasNextPage } = movieStore
    const { increasePageNumber } = moviesSlice.actions
    const dispatch = useDispatch()

    const { isLoading, isError, error } =
      useMovieSearch();
  
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
        <div className="movie-content">
          <Movies
            innerRef={lastMovieRef}
            movies={movies || []}
          />
          <h1>{isLoading && "Loading..."}</h1>
          <h1>{isError && error}</h1>
        </div>
    );
};

export default Index;
