const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
    max: 120,
    min: 5,
  },
  born: {
    type: String,
    require: true,
  },
  nameInMovie: {
    type: String,
    require: true,
  },
  castImage: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return /^https?\/\//.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid url for the cast image!`,
    },
  },
});

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;
