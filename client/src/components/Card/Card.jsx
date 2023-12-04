import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, background_image, genres }) => {

  return (
    <div className={style.container}>
      <img  className={style.img}src={background_image} alt="" />
      <Link to={`/detail/${id}`}>
        <p className={style.name}>Name: {name}</p>
      </Link>
      {Array.isArray(genres) && (
        <p className={style.genres}> Genres: {genres}</p>
      )}
    </div>
  );
};

export default Card;
