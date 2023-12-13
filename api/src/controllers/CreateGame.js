const { Videogame, Genres } = require("../db");
const axios = require("axios");

const createNewGame = async (
  name,
  platforms,
  background_image,
  freleaseds,
  rating,
  genres,
  description
) => {
  const newVideoGame = await Videogame.create({
    name,
    platforms,
    background_image,
    freleaseds,
    rating,
    genres,
    description,
  });
 // Itera sobre los géneros del juego
  for (const genreName of genres) {
    // Busca en la tabla Genres un registro con el nombre del género actual
    const genresDb = await Genres.findOne({
      where: { name: genreName },
    });

    if (genresDb) {
      // Asocia el nuevo videojuego con el género encontrado
      await newVideoGame.addGenres(genresDb);
    }
  }

  return newVideoGame;
};

module.exports = createNewGame;
