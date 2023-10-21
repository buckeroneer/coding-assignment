import { useState } from "react";

import { getMovieById } from "../../api/movies";
import { Movie, Modal } from "../index.js";
import "./movies.scss";
import "./movies.css";

const Movies = ({ movies, innerRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  async function getMovie(id) {
    const request = getMovieById(id);
    request
      .then((response) => {
        const dataMovie = response.data;
        if (dataMovie.videos && dataMovie.videos.results.length) {
          const trailer = dataMovie.videos.results.find(
            (vid) => vid.type === "Trailer"
          );
          let key = trailer ? trailer.key : dataMovie.videos.results[0].key;
          setVideoKey(key);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("An error occured during the trailer search...");
        setVideoKey("");
      });
  }

  async function viewTrailer(movie) {
    await getMovie(movie.id);
    setVideoKey(videoKey);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setVideoKey("");
  }

  const handleTrailer = (movie) => {
    viewTrailer(movie);
  }

  return (
    <>
      <Modal isOpen={isOpen} videoKey={videoKey} closeModal={closeModal}/>
      <div data-testid="movies">
        {movies?.map((movie, index) => {
          if (index + 1 === movies.length) {
            return (
              <Movie
                innerRef={innerRef}
                movie={movie}
                key={movie.id}
                viewTrailer={handleTrailer}
              />
            );
          } else {
            return (
              <Movie movie={movie} key={movie.id} viewTrailer={handleTrailer} />
            );
          }
        })}
      </div>
    </>
  );
};

export default Movies;
