import React, { useEffect, useState } from 'react'
import { useRouteMatch } from "react-router";
import api from 'api'
import Spinner from 'components/Spinner';
import FilmCard from 'pages/FilmsPage/components/FilmCard'


const FilmDetails = () => {

	const [film, setFilm] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState('')


	let match = useRouteMatch({
		path: "/film/:id/",

	});

	useEffect(() => {
		api.films.fetch(match.params.id).then(film => setFilm(film)).then(setIsLoading(false));

	}, [])

	return (
		<>
			{/* {isLoading ? <Spinner /> : <FilmCard film={film || {}} />} */}
			{isLoading ? <Spinner /> : console.log(film)}
			<p>{film.title}</p>
			<p>{film._id}</p>
			<p>{film.featured}</p>

		</>
	)
}

export default FilmDetails
