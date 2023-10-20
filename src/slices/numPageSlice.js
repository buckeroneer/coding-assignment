import { createSlice } from "@reduxjs/toolkit"

const numPageSlice = createSlice({
    name: 'movies',
    initialState: { 
        pageNumber: 1
    },
    reducers: {
        increasePageNumber: (state) => {
            state.pageNumber = state.pageNumber + 1
        },
        resetPageNumber: (state) => {
            state.pageNumber = 1
        }
    },
})

export default numPageSlice
