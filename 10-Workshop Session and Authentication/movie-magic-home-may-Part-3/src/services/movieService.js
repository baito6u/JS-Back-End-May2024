const { Movie } = require("../models/Movie");

async function getAllMovies() {
  const movies = await Movie.find().lean();

  return movies;
}

async function getMovieById(id) {
  const movie = await Movie.findById(id).lean().populate('cast');

  return movie;
}

async function createMovie(movieData) {
  const movie = new Movie({
    title: movieData.title,
    genre: movieData.genre,
    director: movieData.director,
    year: Number(movieData.year),
    rating: Number(movieData.rating),
    description: movieData.description,
    imageURL: movieData.imageURL,
  });

  await movie.save();

  return movie;
}

async function attachCastToMovie(movieId, castId) {
  const movie = await Movie.findById(movieId);

  if (movie == null) {
    throw new Error(` Movie ${movieId} not found`);
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
  attachCastToMovie,
  search,
};