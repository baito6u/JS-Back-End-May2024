const { Movie } = require("../models/Movie");

async function getAllMovies() {
  const movies = await Movie.find().lean();

  return movies;
}

async function getMovieById(id) {
  const movie = await Movie.findById(id).lean().populate("cast");

  return movie;
}

async function createMovie(movieData, authorId) {
  const movie = new Movie({
    title: movieData.title,
    genre: movieData.genre,
    director: movieData.director,
    year: Number(movieData.year),
    rating: Number(movieData.rating),
    description: movieData.description,
    imageURL: movieData.imageURL,
    author: authorId,
  });

  await movie.save();

  return movie;
}

async function editMovie(movieId, movieData, userId) {
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new Error(` Movie ${movieId} not found`);
  }

  if (movie.author.toString() != userId) {
    throw new Error("Access denied");
  }

  movie.title = movieData.title;
  movie.genre = movieData.genre;
  movie.director = movieData.director;
  movie.year = Number(movieData.year);
  movie.rating = Number(movieData.rating);
  movie.description = movieData.description;
  movie.imageURL = movieData.imageURL;

  await movie.save();

  return movie;
}

async function deleteMovie(movieId, userId) {
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new Error(` Movie ${movieId} not found`);
  }

  if (movie.author.toString() != userId) {
    throw new Error("Access denied");
  }

  await Movie.findByIdAndDelete(movieId);
}

async function attachCastToMovie(movieId, castId, userId) {
  const movie = await Movie.findById(movieId);

  if (movie == null) {
    throw new Error(` Movie ${movieId} not found`);
  }

  if (movie.author.toString() != userId) {
    throw new Error("Access denied");
  }

  movie.cast.push(castId);

  await movie.save();

  return movie;
}

async function search({ title, genre, year }) {
  const movies = await Movie.find().lean();

  if (!title && !genre && !year) {
    return movies;
  }

  const found = movies.filter((m) => {
    if (title && !m.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }
    if (genre && m.genre.toLowerCase() != genre.toLowerCase()) {
      return false;
    }

    if (year && m.year != year) {
      return false;
    }
    return true;
  });

  return found;
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  editMovie,
  deleteMovie,
  attachCastToMovie,
  search,
};