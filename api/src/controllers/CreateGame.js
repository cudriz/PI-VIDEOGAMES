const { Videogame, Genres } = require("../db");
const axios = require("axios");

const createNewGame = async (
  name,
  platforms,
  background_image,
  freleaseds,
  rating,
  genres,
  description,
  
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

//   genres.forEach(async (g) => {
//     const genresDb = await Genres.findOne({
//       where: { name: g },
//     });
//     await newVideoGame.addGenres(genresDb);
//   });

//   return newVideoGame;
// };

for (const genreName of genres) {
    const genresDb = await Genres.findOne({
      where: { name: genreName },
    });

    if (genresDb) {
      await newVideoGame.addGenres(genresDb);
    }
  }

  return newVideoGame;
};


module.exports = createNewGame;
