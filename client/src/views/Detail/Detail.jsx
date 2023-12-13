import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./Detail.module.css";
import { getById, setLoading } from "../../Redux/Actions/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.videoGameId);
  console.log("esatdo del juego",game);
  const loadingState = useSelector((state) => state.loadingState);

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getById(id));
  }, [dispatch]);

  return (
    <div className={style.detailsContainer}>
      <div>
        {!loadingState ? (
          <div>
            <img className={style.img} src={game.background_image} alt={game.name} />
            <h2>id:{game.id}</h2>
            <h2>Name: {game.name}</h2>
            <h2>rating:{game.rating}</h2>
            <h2>Freleaseds:{game.released || game.freleaseds}</h2>
            <h2>Description: {game.description}</h2>
            <h2>Genres: {game.genres}</h2>
            <h2>Platforms: {game.platforms}</h2>
          </div>
        ) : (
          <div>Cargando... </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
