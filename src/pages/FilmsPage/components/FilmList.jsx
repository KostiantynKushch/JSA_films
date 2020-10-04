import React from "react";
import FilmCard from "pages/FilmsPage/components/FilmCard";

const FilmList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.map(film => (
        <FilmCard key={film._id} film={film} />
      ))}
    </div>
  );
};

export default FilmList;
