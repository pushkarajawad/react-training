import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../Models/Movie";
export interface MovieCardSmallProps {
  movie: Movie;
}
export const MovieCardSmall = (props: MovieCardSmallProps) => {
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
