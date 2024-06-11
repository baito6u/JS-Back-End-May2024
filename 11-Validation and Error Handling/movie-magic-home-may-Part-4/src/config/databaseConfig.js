const mongoose = require("mongoose");
require("../models/Movie");
require("../models/Cast");
require("../models/User");

const connetionString = "mongodb://localhost:27017/movie-magic-2";

async function databaseConfig() {
  await mongoose.connect(connetionString);

  console.log("Database connected!");
}

module.exports = { databaseConfig };
