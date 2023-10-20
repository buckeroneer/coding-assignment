import { useEffect, useState, useRef, useCallback } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'

import useMovieSearch from './hooks/useMovieSearch'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Modal from './components/Modal'
import './app.scss'

const App = () => {

  const state = useSelector((state) => state)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const [prevQuery, setPrevQuery] = useState(ENDPOINT_DISCOVER)
  const [pageNum, setPageNum] = useState(1)
  const navigate = useNavigate()

  const { isLoading, isError, error, moviesFetched, hasNextPage } = useMovieSearch(prevQuery, pageNum)

  const observer = useRef()

  const lastMovieRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        console.log(pageNum)
        setPageNum(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, hasNextPage, pageNum])
  
  const closeModal = () => setOpen(false)
  
  const closeCard = () => {

  }

  const getSearchResults = (query) => {
    if (prevQuery !== query) {
      setPageNum(1)
    }
    if (query !== '') {
      setPrevQuery(`${ENDPOINT_SEARCH}&query=`+query)
    } else {
      setPrevQuery(ENDPOINT_DISCOVER)
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
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        <Modal isOpen={isOpen} videoKey={videoKey} closeModal={closeModal}/>
        <div className="movie-test">
          <Movies innerRef={lastMovieRef} movies={moviesFetched || []} viewTrailer={viewTrailer} closeCard={closeCard} />
          <h1>{isLoading && 'Loading...'}</h1>
          <h1>{isError && error}</h1>
        </div>
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
