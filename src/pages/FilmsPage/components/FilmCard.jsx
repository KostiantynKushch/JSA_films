import React, {memo, useState} from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";

const FilmCard = ({film}) => {
  const [description, setDescription] = useState(false);

  const descToggle = e => {
    setDescription(!description);
  };

  return (
    <div className="ui card">
      <Featured featured={film.featured} id={film._id} />
      {description ? (
        <div className="content">{film.description}</div>
      ) : (
        <div className="image">
          <span className="ui green label ribbon">$ {film.price} </span>
          <img src={film.img} alt={film.title} />
        </div>
      )}

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration}
          </span>
        </div>
        <div className="content">
          <i
            onClick={descToggle}
            className={`icon eye ${description ? "slash" : ""} link`}
          ></i>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <span className="ui green basic button">
            <i className="ui icon edit"></i>
          </span>
          <span className="ui red basic button">
            <i className="ui icon trash"></i>
          </span>
        </div>
      </div>
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
