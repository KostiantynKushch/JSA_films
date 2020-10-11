import React, {Component} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import {generate as id} from "shortid";
import FilmList from "pages/FilmsPage/components/FilmList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FilmContext from "contexts/FilmContext";
import {films} from "data";
import TopNavigation from "components/TopNavigation";
import RegistrationForm from "pages/RegistrationPage/components/RegistrationForm";
import LoginForm from "pages/LoginPage/components/LoginForm";

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

  showForm = () => this.setState({showAddForm: true, selectedFilm: {}});
  hideForm = () => this.setState({showAddForm: false, selectedFilm: {}});

  addFilm = film =>
    this.setState(({films, showAddForm, selectedFilm}) => ({
      films: this.sortFilms([...films, {_id: id(), ...film}]),
      showAddForm: false,
      selectedFilm: {},
    }));

  updateFilm = film =>
    this.setState(({films, showAddForm, selectedFilm}) => ({
      films: this.sortFilms(films.map(f => (f._id === film.id ? film : f))),
      showAddForm: false,
      selectedFilm: {},
    }));

  saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film));

  selectedFilmForEdit = selectedFilm =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    });

  state = {
    films: [],
    toggleFeatured: this.toggleFeatured,
    showAddForm: false,
    selectedFilm: {},
    selectedFilmForEdit: this.selectedFilmForEdit,
  };

  render() {
    const {films, showAddForm, selectedFilm} = this.state;
    const cols = showAddForm ? "ten" : "sixteen";
    return (
      <FilmContext.Provider value={this.state}>
        <div className="ui container mt-3">
          <RegistrationForm />
          <LoginForm />
          <TopNavigation showForm={this.showForm} />

          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm
                  film={selectedFilm}
                  saveFilm={this.saveFilm}
                  hideForm={this.hideForm}
                />
              </div>
            )}

            <div className={`${cols} wide column`}>
              <FilmList films={films} />
            </div>
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
