import { Movie } from '../index.js'
import "./movies.scss";
import "./movies.css";

const Movies = ({ movies, viewTrailer, closeCard, innerRef }) => {
  return (
    <div data-testid="movies">
      {movies?.map((movie, index) => {
        if (index + 1 === movies.length) {
          return (
            <Movie
              innerRef={innerRef}
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              closeCard={closeCard}
            />
          );
        } else {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              closeCard={closeCard}
            />
          );
        }
      })}
    </div>
  );
};

export default Movies;
