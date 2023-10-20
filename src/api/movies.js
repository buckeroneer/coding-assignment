import axios from "axios";
import { ENDPOINT, API_KEY } from '../constants.js';

const urlDiscoverMovies = ENDPOINT+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc';
const urlSearchMovies = ENDPOINT+'/search/movie?api_key='+API_KEY

const getMovieById = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    const videoData = await fetch(URL)
      .then((response) => response.json())

    return videoData;
  }

const getMoviesBySearchTerm = (searchTerm, page, signal) => {
    console.log('search called')
    const request = axios.get(urlSearchMovies, {
        params: {
            query: searchTerm,
            page,
            signal
        }
    });
    return request;
}

const getMoviesByDiscover = (page, signal) => {
    console.log('discover called')
    const request = axios.get(urlDiscoverMovies, {
        params: {
            page,
            signal
        }
    });
    return request;
}

export { getMovieById, getMoviesBySearchTerm, getMoviesByDiscover}