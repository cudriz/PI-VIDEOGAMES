const { Videogame, Genres } = require("../db");
const { infoCleaner } = require("../utils/infoCleaner");
const axios = require("axios");

const getNameVideoGame = async (name) => {
  let URL = `https://api.rawg.io/api/games?search=${name}&key=0b0b6919d408490ca2ed1f45e46ec0df`;
  const gameApi = (await axios.get(`${URL}`)).data.results;

  const gameDb = await Videogame.findAll({
    where: {
      name: name,
    },
    include: [Genres],
  });

  const allGame = [...gameApi, ...gameDb];

  if (!allGame.length) {
    throw new Error("Este nombre no coincide con ningun videojuego");
  }

  const cleanerGameApi = (game) => {
    return game.map((videoGame) => ({
      id: videoGame.id,
      name: videoGame.name,
      platforms: videoGame.platforms
        .map((platform) => platform.platform.name)
        .join(", "),
      background_image: videoGame.background_image,
      released: videoGame.released,
      rating: videoGame.rating,
      description: videoGame.description,
      genres: videoGame.genres.map((gen) => gen.name).join(", "),
    }));
  };

  return cleanerGameApi(allGame);
};

module.exports = getNameVideoGame;
