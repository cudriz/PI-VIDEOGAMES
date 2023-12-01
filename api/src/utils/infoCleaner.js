const infoCleaner = (videogames) => {
  const cleanedInfo = videogames.results.map((game) => ({
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
  }));
  return cleanedInfo;
};

module.exports = { infoCleaner };
