const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  description: String,
  price: Number,
  img: String,
  material: String,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
