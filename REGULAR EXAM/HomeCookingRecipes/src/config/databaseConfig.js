const mongoose = require("mongoose");

require("../models/Data");
require("../models/User");

async function databaseConfig() {
  //TODO change DB name
  const connectionString = "mongodb://localhost:27017/home-recipes";

  mongoose.connect(connectionString);

  console.log("Database connected");
}

module.exports = { databaseConfig };
