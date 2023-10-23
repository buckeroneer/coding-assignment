import { createSlice } from "@reduxjs/toolkit"

const videoTrailerSlice = createSlice({
    name: 'videoTrailer',
    initialState: { 
        videoId: '',
        isOpen: false
    },
    reducers: {
        setVideoKey: (state, action) => {
            state.videoId = action.payload
        },
        resetVideoKey: (state) => {
            state.videoId = ''
        },
        openVideo: (state) => {
            state.isOpen = true;
        },
        closeVideo: (state) => {
            state.isOpen = false;
        }
    },
})

export default videoTrailerSlice