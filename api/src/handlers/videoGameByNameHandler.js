const getNameVideoGame = require("../controllers/getNameVideoGame");

const videoGameNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const gameByName = await getNameVideoGame(name);
      res.status(200).json(gameByName);
    } else {
      res.status(400).json(`VideoGame con el nombre ${name}, no existe.`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = videoGameNameHandler;
