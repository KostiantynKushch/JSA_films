import React, {Component} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import FilmList from "pages/FilmsPage/components/FilmList";
import FilmContext from "contexts/FilmContext";
import {films} from "data";

class App extends Component {
  componentDidMount() {
    this.setState({films: this.sortFilms(films)});
  }

  sortFilms = films =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = id =>
    this.setState(({films}) => ({
      films: this.sortFilms(
        films.map(film =>
          film._id === id ? {...film, featured: !film.featured} : film,
        ),
      ),
    }));

  state = {
    films: [],
    toggleFeatured: this.toggleFeatured,
  };

  render() {
    const {films} = this.state;
    return (
      <FilmContext.Provider value={this.state}>
        <div className="ui container mt-3">
          <FilmList films={films} />
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
