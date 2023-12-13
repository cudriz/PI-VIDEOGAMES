import React from "react";
import style from "./Search.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchGames } from "../../Redux/Actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [busqueda, setBusqueda] = useState("");
  const games = useSelector((state) => state.allVideoGames);

  const handleChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSearch = async () => {
    await dispatch(searchGames(busqueda));
    setBusqueda("");
  };

  useEffect(() => {}, [games]);
  return (
    <div className={style.search}>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Buscar driver"
        value={busqueda}
        onChange={handleChange}
      />

      <button
        onClick={handleSearch}
        value="Search"
        type="submit"
        className={style.button}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
