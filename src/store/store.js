import { configureStore } from "@reduxjs/toolkit"
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'
import numPageSlice from "./numPageSlice"

const store = configureStore({
    reducer: {
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        numPage: numPageSlice.reducer
    },
})

export default store
