import React from "react";
import style from "./Filters.module.css";

export const FiltrosBar = ({
  allGenres,
  handleFilter,
  handleFilterOrigin,
  getGamesOrderRating,
  gamesOrderAll,
}) => {
  return (
    <div className={style.filter}>
      <div>Genero
        <select name="genres" id="" onChange={(e) => handleFilter(e)}>
          <option value="">Elija Genero</option>
          {allGenres &&
            allGenres.length > 0 &&
            allGenres.map((genres, index) => {
              return (
                <option key={index} value={genres.name}>
                  {genres.name}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        Origin
        <select onChange={(e) => handleFilterOrigin(e)}>
          {["All", "Api", "Local"].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div>
        Order By Rating
        <select onChange={(e) => getGamesOrderRating(e)}>
          <option value="Default">Default</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
      </div>

      <div>
        Alfabeticamente
        <select onChange={(e) => gamesOrderAll(e)}>
          <option value=""></option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
      </div>
    </div>
  );
};
