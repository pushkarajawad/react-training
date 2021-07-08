import React, { ChangeEventHandler } from "react";
import { useEffect, useState } from "react";
import { CardDeck, Card, Button, CardColumns, ListGroup, ListGroupItem, Alert, Form } from "react-bootstrap";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Movie, Transaction } from "../Models/Movie";
import { ServiceManager } from "../ServiceManager";

import ReactDatePicker from "react-datepicker";
var uniqid = require("uniqid");
var QRCode = require("qrcode.react");
export interface MatchParams {
  movieId: string;
}

export const SHOW_TIMING = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "09:00 PM", "12:00 AM"];

export const NO_OF_SEATS = [
  {
    name: "--No of seats--",
    value: 1,
  },
  {
    name: 1,
    value: 1,
  },
  {
    name: 2,
    value: 2,
  },
  {
    name: 3,
    value: 3,
  },
];

export interface IBookMovieState {
  movie: Movie;
  startDate: any;
  noOfSeats: number;
  showTime: string;
  seatType: number;
  transactionId: string;
}

export interface IBookMovieProps extends RouteComponentProps<MatchParams> {}

class BookMovie extends React.Component<IBookMovieProps, IBookMovieState> {
  constructor(props: IBookMovieProps) {
    super(props);

    this.state = {
      movie: {} as Movie,
      startDate: new Date(),
      showTime: SHOW_TIMING[0],
      noOfSeats: NO_OF_SEATS[1].value,
      seatType: 0,
      transactionId: "",
    };
    this.bookTicket = this.bookTicket.bind(this);
    this.selectNoOfSeats = this.selectNoOfSeats.bind(this);
    this.selectSeatType = this.selectSeatType.bind(this);
  }

  selectNoOfSeats = (event: any) => {
    this.setState({ noOfSeats: event.target.value });
  };

  selectSeatType = (event: any) => {
    this.setState({ seatType: event.target.value });
  };

  bookTicket() {
    let transaction: Transaction = {
      movieId: this.state.movie.id,
      price: this.state.noOfSeats * this.state.seatType,
      currency: this.state.movie.currency,
      userId: uniqid(),
      id: uniqid(),
    };

    ServiceManager.getInstance()
      .BookMovie(transaction)
      .then((response) => {
        console.log(response.data);
        this.setState({ transactionId: response.data.id });
      });
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
        {this.state.movie && this.state.movie.id && this.state.transactionId === "" && (
          <div>
            <div style={{ display: "flex" }}>
              <Card.Img style={{ width: "250px", height: "250px" }} variant="top" src={this.state.movie.image} />
              <Card.Body>
                <Card.Title>{this.state.movie.title}</Card.Title>
                <Card.Text>{this.state.movie.plot}</Card.Text>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>{this.state.movie.genre}</ListGroupItem>
                </ListGroup>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <ReactDatePicker
                      minDate={this.state.startDate}
                      selected={this.state.startDate}
                      onChange={(date) => this.setState({ startDate: date })}
                    ></ReactDatePicker>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      variant="info"
                      onClick={() => {
                        this.setState({ ...this.state, seatType: this.state.movie.prices.normal });
                      }}
                    >
                      Normal
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => {
                        this.setState({ ...this.state, seatType: this.state.movie.prices.sofa });
                      }}
                    >
                      Sofa
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => {
                        this.setState({ ...this.state, seatType: this.state.movie.prices.superior });
                      }}
                    >
                      Superior
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem>
                    <select onChange={this.selectNoOfSeats} value={NO_OF_SEATS[1].value}>
                      {NO_OF_SEATS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </ListGroupItem>
                  <ListGroupItem>
                    {SHOW_TIMING.map((item) => {
                      return (
                        <p key={item}>
                          <Button
                            variant="info"
                            onClick={() => {
                              this.setState({ ...this.state, showTime: item });
                            }}
                          >
                            {item}
                          </Button>
                        </p>
                      );
                    })}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </div>
            <div>
              <NavLink className="nav-link" to={"/book-movie/" + this.state.movie.id}>
                <Button variant="primary" onClick={this.bookTicket}>
                  Book
                </Button>
              </NavLink>
            </div>
          </div>
        )}
        {this.state.movie && this.state.movie.id && this.state.transactionId !== "" && (
          <div>
            <h4>You have successfully booked ticket, please scan below QR code</h4>
            <hr />
            <QRCode value={this.state.transactionId} />
            <div>
              <h5>Ticket Details</h5>
              <label>Title: </label>
              <b>{this.state.movie.title}</b>
              <hr />
              <label>Show Time: </label>
              <b>{this.state.showTime}</b>
              <hr />
              <label>No of seats: </label>
              <b>{this.state.noOfSeats}</b>
              <hr />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(BookMovie);
