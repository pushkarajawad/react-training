import React from "react";
import { useEffect, useState } from "react";
import { CardDeck, Card, Button, CardColumns, ListGroup, ListGroupItem, Alert, Form } from "react-bootstrap";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Movie } from "../Models/Movie";
import { ServiceManager } from "../ServiceManager";
const initialMovie = {} as Movie;

export interface MatchParams {
  movieId: string;
}

export interface IMovieDetailsState {
  movie: Movie;
}
export interface IMovieDetailsProps extends RouteComponentProps<MatchParams> {}

class MovieDetails extends React.Component<IMovieDetailsProps, IMovieDetailsState> {
  constructor(props: IMovieDetailsProps) {
    super(props);
    this.state = { movie: {} as Movie };
  }

  componentDidMount() {
    ServiceManager.getInstance()
      .getMovieById(this.props.match.params.movieId)
      .then((response) => {
        if (response.data && response.data.length > 0) this.setState({ movie: response.data[0] });
      });
  }

  render() {
    return (
      <div>
        {this.state.movie && this.state.movie.id && (
          <Card>
            <Card.Img variant="top" src={this.state.movie.image} />
            <Card.Body>
              <Card.Title>{this.state.movie.title}</Card.Title>
              <Card.Text>{this.state.movie.plot}</Card.Text>

              <ListGroup className="list-group-flush">
                <ListGroupItem>{this.state.movie.genre}</ListGroupItem>
                <ListGroupItem>{this.state.movie.director}</ListGroupItem>
                <ListGroupItem>{this.state.movie.stars}</ListGroupItem>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <NavLink className="nav-link" to={"/book-movie/" + this.state.movie.id}>
                <Button variant="primary">Book</Button>
              </NavLink>
            </Card.Footer>
          </Card>
        )}
      </div>
    );
  }
}
export default withRouter(MovieDetails);
