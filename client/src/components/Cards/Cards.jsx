import React from "react";
import Card from "../Card/Card";
import style from './Cards.module.css'

const Cards = ({ cards }) => {
  return (
    <div className={style.container}>
      {cards.map((game) => 
        game && (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            platforms={game.platforms}
            background_image={game.background_image}
            released={game.released}
            rating={game.rating}
            description={game.description}
            genres={game.genres}
          />
        )
      )}
    </div>
  );
};

export default Cards;
