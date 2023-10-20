import { useEffect, useState } from "react";
import axios from "axios";

export default function useMovieSearch(apiUrl, pageNumber) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [moviesFetched, setMoviesFetched] = useState([]);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    if (pageNumber === 1) {
      setMoviesFetched([]);
    }
    let cancel;
    axios({
      method: "GET",
      url: apiUrl,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setMoviesFetched((prev) => [...prev, ...response.data.results]);
        setHasNextPage(pageNumber < response.data.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) return;
        setIsError(true);
        setError({ message: error.message });
      });
    return () => cancel();
  }, [apiUrl, pageNumber]);

  return { isLoading, isError, error, moviesFetched, hasNextPage };
}
