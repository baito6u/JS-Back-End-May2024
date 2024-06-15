const mongoose = require("mongoose");
//TODO importmodels

async function databaseConfig() {
  //TODO change DB name
  const connectionString = "mongodb://localhost:27017/exam-db";

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("Database connected");
}

module.exports = {databaseConfig}