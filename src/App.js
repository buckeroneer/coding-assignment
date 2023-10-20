import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import 'reactjs-popup/dist/index.css'

import numPageSlice from './slices/numPageSlice'
import { ENDPOINT, API_KEY } from './constants'

import ScrollContent from './components/ScollContent'
import Header from './components/Header'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Modal from './components/Modal'
import './app.scss'

const App = () => {

  const { resetPageNumber } = numPageSlice.actions
  const dispatch = useDispatch()

  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const [prevQuery, setPrevQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  
  const closeModal = () => setOpen(false)
  
  const closeCard = () => {

  }

  const getSearchResults = (query) => {
    if (prevQuery !== query) {
      dispatch(resetPageNumber())
    }
    if (query !== '') {
      setPrevQuery(query)
    } else {
      setPrevQuery('')
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">
      <Header searchMovies={searchMovies}/>

      <div className="container">
        <Modal isOpen={isOpen} videoKey={videoKey} closeModal={closeModal}/>
        {location.pathname === '/' ? (
        <ScrollContent className="movies-content" 
        viewTrailer={viewTrailer} 
        closeCard={closeCard} 
        prevQuery={prevQuery} 
        />): (<></>)}
        <Routes>
          <Route path="/"/>
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
