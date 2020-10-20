import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from 'lodash/find'
import FilmList from "pages/FilmsPage/components/FilmList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FilmContext from "contexts/FilmContext";
import api from 'api'
import Spinner from 'components/Spinner'

class FilmsPage extends Component {
	componentDidMount() {
		api.films.fetchAll()
			.then(films => this.setState({ films: this.sortFilms(films), loading: false }));
	}

	sortFilms = films =>
		sortWith([descend(prop("featured")), ascend(prop("title"))], films);

	toggleFeatured = _id => {
		const film = _find(this.state.films, { _id })
		return this.updateFilm({ ...film, featured: !film.featured })
	}


	showForm = () => this.setState({ showAddForm: true, selectedFilm: {} });
	hideForm = () => this.setState({ showAddForm: false, selectedFilm: {} });

	addFilm = filmData => api.films.create(filmData)
		.then(film => this.setState(({ films, showAddForm, selectedFilm }) => ({
			films: this.sortFilms([...films, film]),
			showAddForm: false,
			selectedFilm: {},
		})))


	updateFilm = filmData => api.films.update(filmData).then(film => this.setState(({ films, showAddForm, selectedFilm }) => ({
		films: this.sortFilms(films.map(f => (f._id === film.id ? film : f))),
		showAddForm: false,
		selectedFilm: {},
	})));



	saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film));

	selectedFilmForEdit = selectedFilm =>
		this.setState({
			selectedFilm,
			showAddForm: true,
		});

	deleteFilm = film => api.films.delete(film).then(() => this.setState(({ films, selectedFilm, showAddForm }) => ({
		films: this.sortFilms(films.filter(f => f._id !== film._id)),
		selectedFilm: {},
		showAddForm: false,
	})));

	state = {
		films: [],
		loading: true,
		toggleFeatured: this.toggleFeatured,
		showAddForm: false,
		selectedFilm: {},
		selectedFilmForEdit: this.selectedFilmForEdit,
		deleteFilm: this.deleteFilm,
	};

	render() {
		const { films, showAddForm, selectedFilm, loading } = this.state;
		const cols = showAddForm ? "ten" : "sixteen";
		return (
			<FilmContext.Provider value={this.state}>
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
						{loading ? <Spinner /> : <FilmList films={films} />}
					</div>
				</div>
			</FilmContext.Provider>
		);
	}
}

export default FilmsPage;
