const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  gentre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2030,
  },
  imageURL: {
    type: String,
    required: true,
    match: /^https?/,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
