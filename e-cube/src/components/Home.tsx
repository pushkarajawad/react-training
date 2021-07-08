import { useEffect, useState } from "react";
import { Button, Card, CardDeck, Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../Models/Movie";
import { ServiceManager } from "../ServiceManager";
import { MovieCardSmall } from "./MovieCardSmall";
const initialSliderMovie = [] as Movie[];
export const Home = () => {
  const [sliderMovie, setSliderMovie] = useState(initialSliderMovie);
  const [recommentedMovie, setRecommentedMovie] = useState(initialSliderMovie);
  useEffect(() => {
    ServiceManager.getInstance()
      .getSliderMovies()
      .then((response) => {
        console.log(response.data);
        setSliderMovie(response.data);
      });
  }, []);
  return (
    <div>
      <Carousel className="bg-primary">
        {sliderMovie.map((movie) => {
          return (
            <Carousel.Item interval={5000} key={movie.id}>
              <img height="400px" src={movie.image} alt={movie.title} />
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p>{movie.plot}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <h3>Recommended movies</h3>
      <CardDeck>
        {sliderMovie.map((movie) => {
          return <MovieCardSmall movie={movie}></MovieCardSmall>;
        })}
      </CardDeck>
    </div>
  );
};
