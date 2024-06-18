const mongoose = require("mongoose");

require("../models/Stone"); 
require("../models/User");

async function databaseConfig() {
  //TODO change DB name
  const connectionString = "mongodb://localhost:27017/earth-treasure";

  mongoose.connect(connectionString);

  console.log("Database connected");
}

module.exports = { databaseConfig };
