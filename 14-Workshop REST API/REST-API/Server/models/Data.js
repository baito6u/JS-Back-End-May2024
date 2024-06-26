const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  description: String,
  price: Number,
  img: String,
  matirial: String,
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;