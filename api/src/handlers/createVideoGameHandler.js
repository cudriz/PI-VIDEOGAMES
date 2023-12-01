const createNewGame = require("../controllers/CreateGame");

const createVideoGameHandler = async (req, res) => {
  const {
    name,
    platforms,
    background_image,
    freleaseds,
    rating,
    genres,
    description,
  } = req.body;
  try {
    const gameCreated = await createNewGame(
      name,
      platforms,
      background_image,
      freleaseds,
      rating,
      genres,
      description,
    );

    return res.status(200).json(gameCreated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createVideoGameHandler;
