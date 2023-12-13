import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, background_image, genres }) => {
  // console.log(id, name, background_image, genres);
  const genresArray = genres.split(", ");

  return (
    <div className={style.container}>
      <img className={style.img} src={background_image} alt="" />
      <Link to={`/detail/${id}`}>
        <p className={style.name}>Name: {name}</p>
      </Link>
      {Array.isArray(genresArray) && (
        <p className={style.genres}> Genres: {genresArray.join(", ")}</p>
      )}
    </div>
  );
};


export default Card;