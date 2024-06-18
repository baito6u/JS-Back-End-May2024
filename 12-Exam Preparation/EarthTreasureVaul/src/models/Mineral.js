const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  formula: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: [],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Stone = mongoose.model("Stone", stoneSchema);

module.exports = { Stone };
