import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMoviesByDiscover, getMoviesBySearchTerm } from "../api/movies.js";

function removeRepeatedMovies(movies) {
  const uniqueMovies = movies.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
  );

  return uniqueMovies
}

export const searchMovies = createAsyncThunk(
  "search-movies",
  async (params, thunkAPI) => {
    const { query, pageNumber } = params;
    try {
      const response = await getMoviesBySearchTerm(
        query,
        pageNumber,
        thunkAPI.signal
      );

      return await response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Error querying movies",
        signal: thunkAPI.signal,
      });
    }
  }
);

export const discoverMovies = createAsyncThunk(
  "discover-movies",
  async (params, thunkAPI) => {
    const { pageNumber } = params;
    try {
      const response = await getMoviesByDiscover(pageNumber, thunkAPI.signal);

      return await response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Error querying movies",
        signal: thunkAPI.signal,
      });
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
    pageNumber: 1,
    discoverProcess: true,
    hasNextPage: false,
  },
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
    },
    increasePageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    resetPageNumber: (state) => {
      state.pageNumber = 1;
    },
    setDiscoverProcess: (state) => {
      state.discoverProcess = true
    },
    unsetDiscoverProcess: (state) => {
      state.discoverProcess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results];
        state.movies = removeRepeatedMovies(state.movies);
        state.hasNextPage = state.pageNumber < action.payload.total_pages;
        state.fetchStatus = "success";
      })
      .addCase(searchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(searchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      })
      .addCase(discoverMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results];
        state.movies = removeRepeatedMovies(state.movies);
        state.hasNextPage = state.pageNumber < action.payload.total_pages;
        state.fetchStatus = "success";
      })
      .addCase(discoverMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(discoverMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
