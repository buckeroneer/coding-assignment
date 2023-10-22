import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import moviesSlice from '../store/moviesSlice.js'
import starredSlice from '../store/starredSlice.js'
import watchLaterSlice from '../store/watchLaterSlice.js'
import videoTrailerSlice from '../store/videoTrailerSlice.js';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        movieStore: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        videoTrailer: videoTrailerSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch)

  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}