import { useEffect, useState } from "react";
import { CardDeck, Card, Button, CardColumns, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../Models/Movie";
import { ServiceManager } from "../ServiceManager";
import { MovieCardLarge } from "./MovieCardLarge";
const initialMovie = [] as Movie[];
export const LatestMovies = () => {
  const [latestMovie, setLatestMovie] = useState(initialMovie);
  useEffect(() => {
    ServiceManager.getInstance()
      .getLatestMovies()
      .then((response) => {
        console.log(response.data);
        setLatestMovie(response.data);
      });
  }, []);

  return (
    <div>
      <CardColumns>
        {latestMovie.map((movie) => {
          return <MovieCardLarge movie={movie}  key={movie.id}></MovieCardLarge>;
        })}
      </CardColumns>
    </div>
  );
};
