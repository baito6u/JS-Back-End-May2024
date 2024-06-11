const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 10,
        max: 200,
    },
    born: {
      type: String,
      required: true,
    },
    nameInMovie: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      match: /^https?:\/\/.+/,
    },
    movie: {
      type: [mongoose.Types.ObjectId],
      ref: "Movie",
    },
  });
  
  const Cast = mongoose.model("Cast", castSchema);
  
  module.exports = Cast;