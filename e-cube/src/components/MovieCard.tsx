import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../Models/Movie";
export interface MovieCardProps {
  movie: Movie;
}
export const MovieCard = (props: MovieCardProps) => {
  return (
        <Card key={props.movie.id}>
        <NavLink  to={"/movie/" + props.movie.id}>
          <Card.Img variant="top" src={props.movie.image} />
          </NavLink>
          <Card.Body>
            <Card.Title>{props.movie.title}</Card.Title>
            <Card.Text>{props.movie.plot}</Card.Text>
          </Card.Body>

          <Card.Footer>
            <NavLink className="nav-link" to={"/book-movie/" + props.movie.id}>
              <Button variant="primary">Book</Button>
            </NavLink>
          </Card.Footer>
     
        </Card>
  );
};
