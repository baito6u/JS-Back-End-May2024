const mongoose = require("mongoose");
const { Movie } = require("../models/Movie");
require("../models/Cast");
const { User } = require("../models/User");

const connetionString = "mongodb://localhost:27017/movie-magic-2";

async function databaseConfig() {
  await mongoose.connect(connetionString);

  await migrateMovies();

  console.log("Database connected!");
}

module.exports = { databaseConfig };

async function migrateMovies() {
  const firstUser = await User.findOne();

  await Movie.updateMany({}, { $set: { author: firstUser._id } });
}
