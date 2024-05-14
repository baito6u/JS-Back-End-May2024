const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

exports.create = (movieData) => Movie.create(movieData);

//TODO: filter result in mongoDB
exports.search = (title, genre, year) => {
  let query = {};

  if (title) {
    query.title = new RegExp(title, "i");
  }
  if (genre) {
    query.genre = genre.toLowerCase();
  }
  if (year) {
    query.year = year;
  }

  return Movie.find(query);
};

exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);

  //TODO: validate castId if exists
  //TODO: validate cast is already added

  movie.casts.push(castId);

  return movie.save();

  //return  Movie.findByIdAndUpdate(movieId, { $push: { cast: castId } });
};
