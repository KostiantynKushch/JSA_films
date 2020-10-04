import React, {memo, useContext} from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButton from "pages/FilmsPage/components/FilmCardButton";

const FilmCard = ({film}) => {
  return (
    <div className="ui card">
      <Featured featured={film.featured} id={film._id} />
      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <img src={film.img} alt={film.title} />
      </div>

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration}
          </span>
        </div>
      </div>
      <FilmCardButton film={film} />
    </div>
  );
};

FilmCard.defaultProps = {
  film: {},
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(FilmCard);
