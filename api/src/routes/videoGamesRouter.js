const { Router } = require("express");
const videoGamesHandler = require("../handlers/videoGamesHandler");
const videoGameByIdHandler = require("../handlers/videoGameByIdHandler");
const videoGameByNameHandler = require("../handlers/videoGameByNameHandler");
const createVideoGameHandler = require("../handlers/createVideoGameHandler");

const videoGamesRouter = Router();

videoGamesRouter.get("/", videoGamesHandler);

videoGamesRouter.get("/:id", videoGameByIdHandler);

videoGamesRouter.get("/search/name", videoGameByNameHandler);

videoGamesRouter.post("/", createVideoGameHandler);

module.exports = videoGamesRouter;
