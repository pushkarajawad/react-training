import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-datepicker/dist/react-datepicker.css";
import { Header } from "./components/Header";
import { Sections } from "./components/Sections";
import { Home } from "./components/Home";
import { LatestMovies } from "./components/LatestMovies";
import { NearByEvents } from "./components/NearByEvents";
import { NotFound } from "./components/NotFound";
import { UpcomingMovies } from "./components/UpcomingMovies";
import  MovieDetails  from "./components/MovieDetails";
import BookMovie from "./components/BookMovie";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Sections />
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/upcoming-movies">
              <UpcomingMovies />
            </Route>
            <Route path="/latest-movies">
              <LatestMovies />
            </Route>
            <Route path="/movie/:movieId">
              <MovieDetails />
            </Route>
            <Route path="/book-movie/:movieId">
              <BookMovie />
            </Route>
            <Route path="/nearby-events">
              <NearByEvents />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
