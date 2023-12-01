const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

const getGenresVideoGame = async () => {
  const URL = `https://api.rawg.io/api/genres?key=0b0b6919d408490ca2ed1f45e46ec0df`;

  const { data } = await axios.get(URL);
  if (data.results && data.results.length > 0) {
    data.results.forEach((gen) => {
      Genres.findOrCreate({
        where: { name: gen.name },
      });
    });
  }
  const genresDB = await Genres.findAll();

  return genresDB;
};
module.exports = getGenresVideoGame;
