const mongoose = require("mongoose");

require("../models/Data"); //TODO import real models 
require("../models/User");

async function databaseConfig() {
  //TODO change DB name
  const connectionString = "mongodb://localhost:27017/exam-db";

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Database connected");
}

module.exports = { databaseConfig };
