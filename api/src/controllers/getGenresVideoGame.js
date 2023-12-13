const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

const getGenresVideoGame = async () => {
  const URL = `https://api.rawg.io/api/genres?key=0b0b6919d408490ca2ed1f45e46ec0df`;

  const { data } = await axios.get(URL);
  if (data.results && data.results.length > 0) {
     // Itera sobre los resultados de la API (géneros)
    data.results.forEach((gen) => {
       // Busca o crea un nuevo registro en la tabla Genres con el nombre del género actual
      Genres.findOrCreate({
        where: { name: gen.name },
      });
    });
  }
   // Obtiene todos los géneros almacenados en la base de datos después de la actualización
  const genresDB = await Genres.findAll();

  return genresDB;
};
module.exports = getGenresVideoGame;
