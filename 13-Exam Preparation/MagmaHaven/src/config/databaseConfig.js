const mongoose = require("mongoose");

require("../models/Data"); //TODO import real models
require("../models/User");

async function databaseConfig() {
  const connectionString = "mongodb://localhost:27017/magma-haven";

  mongoose.connect(connectionString);

  console.log("Database connected");
}

module.exports = { databaseConfig };
