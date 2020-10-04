import React, {useContext} from "react";
import PropTypes from "prop-types";
import FilmContext from "contexts/FilmContext";

const Featured = ({featured, id}) => {
  const {toggleFeatured} = useContext(FilmContext);
  const featuredCalss = featured ? "yellow" : "empty";
  return (
    <span onClick={() => toggleFeatured(id)} className="ui right corner label">
      <i className={`${featuredCalss} star icon`}></i>
    </span>
  );
};

Featured.prototype = {
  featured: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Featured;
