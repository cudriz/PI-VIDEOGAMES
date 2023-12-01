const getIdVideoGame = require("../controllers/getIdVideoGame");

const getVideoGameIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const response = await getIdVideoGame(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getVideoGameIdHandler;
