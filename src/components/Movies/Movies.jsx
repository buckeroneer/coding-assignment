import { Movie } from '../index.js'
import "./movies.scss";
import "./movies.css";

const Movies = ({ movies, handleModal, innerRef }) => {
  return (
    <div data-testid="movies">
      {movies?.map((movie, index) => {
        if (index + 1 === movies.length) {
          return (
            <Movie
              innerRef={innerRef}
              movie={movie}
              key={movie.id}
              handleModal={handleModal}
            />
          );
        } else {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              handleModal={handleModal}
            />
          );
        }
      })}
    </div>
  );
};

export default Movies;
