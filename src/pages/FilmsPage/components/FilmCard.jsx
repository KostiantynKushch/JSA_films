import React, { memo } from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButtons from "pages/FilmsPage/components/FilmCardButtons";

const FilmCard = ({ film }) => {
	return (
		<div className="ui card">
			<Featured featured={film.featured} id={film._id} />
			<div className="image">
				<span className="ui green label ribbon">$ {film.price} </span>
				<img src={film.img} alt="" />
			</div>

			<div className="content">
				<Link to={`/film/${film._id}`} className="header">{film.title}</Link>
				<div className="meta">
					<i className="icon users"></i> {film.director}
					<span className="right floated">
						<i className="icon wait right"></i> {film.duration} min
          </span>
				</div>
			</div>

			<FilmCardButtons film={film} />
		</div>
	);
};

FilmCard.propTypes = {
	film: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		director: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		featured: PropTypes.bool.isRequired,
	}).isRequired,
};

FilmCard.defaultProps = {
	film: {},
};

export default memo(FilmCard);
