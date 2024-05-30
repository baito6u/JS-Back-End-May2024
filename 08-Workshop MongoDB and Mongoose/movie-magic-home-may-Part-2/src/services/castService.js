const Cast = require("../models/Cast");
const Movie = require("../models/Movie");

async function getAllCasts() {
  const casts = await Cast.find().lean();

  return casts;
}

async function getCastById(castId) {
  const casts = await Movie.findById({ _id: { $in: castId } }).lean();

  return casts;
}

async function create(castData) {
    const result = await Cast.create(castData);

    return result;
}

module.exports = {
    getAllCasts,
    getCastById,
    create
  };
