const fs = require("fs/promises");
const { Movie } = require("../models/Movie");

const dataFilePath = "./data/database.json";

async function readFile() {
  const data = await fs.readFile(dataFilePath);

  return JSON.parse(data.toString());
}

async function writeFile(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data));
}

function toMovieModel(data) {
  const movie = new Movie();

  movie.id = data.id;
  movie.title = data.title;
  movie.genre = data.genre;
  movie.director = data.director;
  movie.year = data.year;
  movie.imageURL = data.imageURL;
  movie.rating = data.rating;
  movie.description = data.description;

  return movie;
}

async function getAllMovies() {
  const movies = await readFile();

  return movies.map(toMovieModel);
}

async function getMovieById(id) {
  const movies = await readFile();
  const movie = movies.find(movie => movie.id == id);

  return movie ? toMovieModel(movie) : undefined;
}

module.exports = {
    getAllMovies,
    getMovieById,
}