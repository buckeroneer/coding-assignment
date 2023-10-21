import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { moviesSlice } from "../../../store/index.js"
import { searchMovies, discoverMovies } from "../../../store/moviesSlice.js"

export default function useMovieSearch() {
  const { movieStore } = useSelector((state) => state);
  const { pageNumber, previousQuery } = movieStore;
  const { resetMovies, resetPageNumber } = moviesSlice.actions;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    if (pageNumber === 1) {
      dispatch(resetPageNumber());
    }
    const controller = new AbortController();
    let requestResult;
    previousQuery !== ""
      ? (requestResult = dispatch(
          searchMovies({
            query: previousQuery,
            pageNumber: pageNumber,
          })
        ))
      : (requestResult = dispatch(
          discoverMovies({
            pageNumber: pageNumber,
          })
        ));

    requestResult
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.signal.aborted) {
          console.log('Aborted')
          return;
        }
        setIsError(true);
        setError({ message: error.message });
      });
    return () => {
      controller.abort();
    };
  }, [previousQuery, pageNumber, dispatch, resetMovies, resetPageNumber]);

  return { isLoading, isError, error };
}
