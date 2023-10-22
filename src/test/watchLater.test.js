import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import watchLaterSlice from '../store/watchLaterSlice.js'
import { moviesMock } from "./mocks/movies.mocks";
import App from "../App";

beforeEach(() => {
  // Mocking the observer is necessary for the infinite scroll functionality
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("Watch Later tests", () => {
  describe("Watch Later rendering", () => {
    it("Navigation to Watch Later page", async () => {
      renderWithProviders(<App />);
    
      await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
      await waitFor(() => {
        expect(
          screen.getAllByText("Through the Eyes of Forrest Gump")[0]
        ).toBeInTheDocument();
      });
      const watchLaterButton = screen.getAllByTestId("watch-later")[0];
      await waitFor(() => {
        expect(watchLaterButton).toBeInTheDocument();
      });
      await userEvent.click(watchLaterButton);
    
      const watchLaterNavLink = screen.getByTestId("nav-fav");
      await waitFor(() => {
        expect(watchLaterNavLink).toBeInTheDocument();
      });
    
      await userEvent.click(watchLaterNavLink);
    
      const watchLaterink = screen.getByTestId("watch-later-div");
      await waitFor(() => {
        expect(watchLaterink).toBeInTheDocument();
      });
      await userEvent.click(watchLaterink);
    });
  })
  describe("watchLaterSlice unit tests", () => {
    const state = { watchLaterMovies: [] };

    it("should set initial state", () => {
      const initialState = state;
      const action = { type: "" };
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result).toEqual({ watchLaterMovies: [] });
    });

    it("should add movie to watch later", () => {
      const initialState = { ...state, watchLaterMovies: [] };
      const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0]);
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result.watchLaterMovies[0]).toBe(moviesMock[0]);
    });

    it("should remove movie from watch later", () => {
      const initialState = { ...state, watchLaterMovies: moviesMock };
      const action = watchLaterSlice.actions.removeFromWatchLater(
        moviesMock[0]
      );
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result.watchLaterMovies[0]).toBe(moviesMock[1]);
    });

    it("should remove all movies", () => {
      const initialState = { ...state, watchLaterMovies: moviesMock };
      const action = watchLaterSlice.actions.removeAllWatchLater(state);
      const result = watchLaterSlice.reducer(initialState, action);
      expect(Object.keys(result.watchLaterMovies).length).toEqual(0);
    });
  });
});
