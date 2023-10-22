import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMoviesByDiscover, getMoviesBySearchTerm } from "../api/movies.js";

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
        signal: thunkAPI.signal
      })
    }
  }
);

export const discoverMovies = createAsyncThunk(
    "discover-movies",
    async (params, thunkAPI) => {
      const { pageNumber } = params;
      try {
        const response = await getMoviesByDiscover(
          pageNumber,
          thunkAPI.signal
        );

        return await response;

      } catch (error) {
        return thunkAPI.rejectWithValue({
            message: "Error querying movies",
            signal: thunkAPI.signal
          })
      }
    }
  );

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
    pageNumber: 1,
    hasNextPage: false,
    previousQuery: "",
    errorMessage: "",
  },
  reducers: {
    resetMovies: (state) => {
        state.movies = []
    },
    increasePageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    resetPageNumber: (state) => {
      state.pageNumber = 1;
    },
    setPreviousQuery: (state, action) => {
      state.previousQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results]
        state.hasNextPage = state.pageNumber < action.payload.total_pages
        state.fetchStatus = "success";
      })
      .addCase(searchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.errorMessage = action.payload.message
      })
      .addCase(discoverMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results]
        state.hasNextPage = state.pageNumber < action.payload.total_pages
        state.fetchStatus = "success";
      })
      .addCase(discoverMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(discoverMovies.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.errorMessage = action.payload.message
      });
  },
});

export default moviesSlice;
