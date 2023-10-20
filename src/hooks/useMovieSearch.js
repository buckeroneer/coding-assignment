import { useEffect, useState } from "react";

import { getMoviesByDiscover, getMoviesBySearchTerm } from "../api/movies";

export default function useMovieSearch(prevQuery, pageNumber) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [moviesFetched, setMoviesFetched] = useState([]);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    console.log(pageNumber)
    if (pageNumber === 1) {
      setMoviesFetched([]);
    }
    const controller = new AbortController();
    let responseRequest;
    prevQuery !== ''
      ? (responseRequest = getMoviesBySearchTerm(
          prevQuery,
          pageNumber,
          controller.signal
        ))
      : (responseRequest = getMoviesByDiscover(pageNumber, controller.signal));
    responseRequest
      .then((response) => {
        setMoviesFetched((prev) => [...prev, ...response.data.results]);
        setHasNextPage(pageNumber < response.data.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (controller.signal.aborted) {
          console.log('Abort succedeed')
          return;}
        setIsError(true);
        setError({ message: error.message });
      });
    return () => {
      controller.abort();
    };
  }, [prevQuery, pageNumber]);

  return { isLoading, isError, error, moviesFetched, hasNextPage };
}
