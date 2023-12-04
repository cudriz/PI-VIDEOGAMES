const URL = "https://api.rawg.io/api/games";
const axios = require("axios");
const { infoCleaner } = require("../utils/infoCleaner");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const getAllVideoGamesApi = async () => {
  const response = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df`
  );
  const response2 = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df&page=2`
  );
  const response3 = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df&page=3`
  );
  const response4 = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df&page=4`
  );
  const response5 = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df&page=5`
  );
  const response6 = await axios.get(
    `${URL}?key=0b0b6919d408490ca2ed1f45e46ec0df&page=6`
  );

  const info = response.data;
  const cleanerInfo = infoCleaner(info);
  return [
    ...cleanerInfo,
    ...infoCleaner(response2.data),
    ,
    ...infoCleaner(response3.data),
    ,
    ...infoCleaner(response4.data),
    ,
    ...infoCleaner(response5.data),
    ,
    ...infoCleaner(response6.data),
  ];
};

const getAllVideoGamesDb = async () => {
  const videogameDb = await Videogame.findAll({
    include: [
      {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const videogameDestructured = videogameDb.map((game) => ({
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    freleaseds: game.freleaseds,
    rating: game.rating,
    // platforms: game.platforms
    // .map((platform) => platform.platform.name)
    // .join(", "),
    description: game.description_raw,
    genres: game.genres.map((gen) => gen.name).join(", "),
  }));
  return [...videogameDestructured];
};

const getAllVideoGames = async () => {
  const gameApi = await getAllVideoGamesApi();
  const infoDb = await getAllVideoGamesDb();
  return gameApi.concat(infoDb);
};

module.exports = getAllVideoGames;
