import moviesSlice, {
  searchMovies,
  discoverMovies,
} from "../store/moviesSlice";
import { payloadSearchMock } from "./mocks/searchPayload.mocks";
import { payloadDiscoverMock } from "./mocks/discoverPayload.mocks";

describe("moviesSlice unit tests", () => {
  describe("search for movies", () => {
    it("should set loading true while action is pending", () => {
      const action = { type: searchMovies.pending };
      const loadingState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );
      expect(loadingState).toEqual({
        movies: [],
        fetchStatus: "loading",
        pageNumber: 1,
        hasNextPage: false,
        previousQuery: "",
      });
      expect(action).toEqual({ type: searchMovies.pending });
    });

    it("should return payload when action is fulfilled", () => {
      const action = {
        type: searchMovies.fulfilled,
        payload: payloadSearchMock.payload,
      };
      const successState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );

      expect(action.payload).toBeTruthy();
      expect(successState).toEqual({
        movies: action.payload.results,
        fetchStatus: "success",
        pageNumber: 1,
        hasNextPage: false,
        previousQuery: "",
      });
    });

    it("should set error when action is rejected", () => {
      const action = { type: searchMovies.rejected };
      const failureState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );

      expect(failureState).toEqual({
        movies: [],
        fetchStatus: "error",
        pageNumber: 1,
        hasNextPage: false,
        previousQuery: "",
      });
      expect(action).toEqual({ type: searchMovies.rejected });
    });
  });
  describe("discover movies", () => {
    it("should set loading true while action is pending", () => {
      const action = { type: discoverMovies.pending };
      const initialState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );

      expect(initialState).toEqual({
        movies: [],
        fetchStatus: "loading",
        pageNumber: 1,
        hasNextPage: false,
        previousQuery: "",
      });
      expect(action).toEqual({ type: discoverMovies.pending });
    });

    it("should return payload when action is fulfilled", () => {
      const action = {
        type: discoverMovies.fulfilled,
        payload: payloadDiscoverMock.payload,
      };
      const successState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );

      expect(action.payload).toBeTruthy();
      expect(successState).toEqual({
        movies: action.payload.results,
        fetchStatus: "success",
        pageNumber: 1,
        hasNextPage: true,
        previousQuery: "",
      });
    });

    it("should set error when action is rejected", () => {
      const action = { type: discoverMovies.rejected };
      const failureState = moviesSlice.reducer(
        {
          movies: [],
          fetchStatus: "",
          pageNumber: 1,
          hasNextPage: false,
          previousQuery: "",
        },
        action
      );
      expect(failureState).toEqual({
        movies: [],
        fetchStatus: "error",
        pageNumber: 1,
        hasNextPage: false,
        previousQuery: "",
      });
      expect(action).toEqual({ type: discoverMovies.rejected });
    });
  });
});
