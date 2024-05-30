const mongoose = require("mongoose");

const connetionString = "mongodb://localhost:27017/movie-magic-2";

async function databaseConfig() {
  await mongoose.connect(connetionString);

  console.log("Database connected!");
}

module.exports = { databaseConfig };
