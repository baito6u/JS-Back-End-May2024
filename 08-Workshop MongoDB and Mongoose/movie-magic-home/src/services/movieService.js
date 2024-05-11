const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

exports.create = (movieData) => Movie.create(movieData);

//TODO: filter result in mongoDB
exports.search = async (title, genre, year) => {
  let ressult = await Movie.find().lean();

  if (title) {
    ressult = ressult.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (genre) {
    ressult = ressult.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
  }
  if (year) {
    ressult = ressult.filter((movie) => movie.year === year);
  }

  return ressult;
};

exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);

  //TODO: validate castId if exists
  //TODO: validate cast is already added

  movie.casts.push(castId);

  return movie.save();

  //return  Movie.findByIdAndUpdate(movieId, { $push: { cast: castId } });
};
