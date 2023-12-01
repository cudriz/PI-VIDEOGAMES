const getAllVideoGames = require("../controllers/getAllVideoGames");


const getVideoGamesHandler = async (req,res) => {
    try {
        const response = await getAllVideoGames();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getVideoGamesHandler;