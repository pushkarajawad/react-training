import { useEffect, useState } from "react";
import { CardDeck, Card, Button, CardColumns, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../Models/Movie";
import { ServiceManager } from "../ServiceManager";
import { MovieCardLarge } from "./MovieCardLarge";
const initialMovie = [] as Movie[];
export const UpcomingMovies = () => {
  const [upcomingMovie, setUpcomingMovie] = useState(initialMovie);
  useEffect(() => {
    ServiceManager.getInstance()
      .getUpcomingMovies()
      .then((response) => {
        console.log(response.data);
        setUpcomingMovie(response.data);
      });
  }, []);

  return (
    <div>
      <CardColumns>
        {upcomingMovie.map((movie) => {
          return <MovieCardLarge movie={movie} key={movie.id} ></MovieCardLarge>;
        })}
      </CardColumns>
    </div>
  );
};
