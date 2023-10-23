import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { moviesSlice } from "../../../store/index.js";
import { searchMovies, discoverMovies } from "../../../store/moviesSlice.js";

export default function useMovieSearch() {
  const { movieStore } = useSelector((state) => state);
  const { pageNumber, discoverProcess } = movieStore;
  const { resetMovies, resetPageNumber } = moviesSlice.actions;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    let requestResult;
    if (searchQuery && !discoverProcess) {
      requestResult = dispatch(
        searchMovies({
          query: searchQuery,
          pageNumber: pageNumber,
        })
      );
    } else {
      requestResult = dispatch(
        discoverMovies({
          pageNumber: pageNumber,
        })
      );
    }

    requestResult
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.signal.aborted) {
          console.log("Aborted");
          return;
        }
        setIsError(true);
        setError({ message: error.message });
      });
    return () => {
      controller.abort();
    };
  }, [
    searchQuery,
    pageNumber,
    dispatch,
    resetMovies,
    resetPageNumber,
    discoverProcess,
  ]);

  return { isLoading, isError, error };
}
