import React, {Component} from "react";
import FilmList from "pages/FilmsPage/components/FilmList";
import {films} from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({films});
  }

  render() {
    return (
      <div className="ui container mt-3">
        <FilmList films={films} />
      </div>
    );
  }
}

export default App;
