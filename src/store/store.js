import { configureStore } from "@reduxjs/toolkit"
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'
import videoTrailerSlice from "./videoTrailerSlice"
import moviesSlice from "./moviesSlice"

const store = configureStore({
    reducer: {
        movieStore: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        videoTrailer: videoTrailerSlice.reducer
    },
})

export default store
