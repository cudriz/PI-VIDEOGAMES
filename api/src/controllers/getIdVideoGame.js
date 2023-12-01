const URL = "https://api.rawg.io/api/games";
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const formatGameInfo = (game) => {
  const formattedGame = {
    id: game.id,
    name: game.name,
    platforms: game.platforms
      .map((platform) => platform.platform.name)
      .join(", "),
    background_image: game.background_image,
    released: game.released,
    rating: game.rating,
    description: game.description_raw,
    genres: game.genres.map((gen) => gen.name).join(", "),
  };

  return formattedGame;
};

const getIdVideoGame = async (id, source) => {
  let game;

  game =
    source === "api"
      ? (await axios.get(`${URL}/${id}?key=0b0b6919d408490ca2ed1f45e46ec0df`))
          .data
      : await Videogame.findByPk(id, {
          include: Genres,
          attributes: ["name"],
        });

  if (source === "api") {
    return formatGameInfo(game);
  }
  if (source === "bdd") {
    game = await Videogame.findByPk(id);
    console.log("id de la bdd", game);

    if (!game) {
      return {
        error: `Videogame con id ${id} no se encuentra en la base de dsatos.`,
      };
    }
    return game;
  }
};

module.exports = getIdVideoGame;
