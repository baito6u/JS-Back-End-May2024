const { getAllMovies, getMovieById } = require("../services/movieService");

module.exports = {
  homeContoller: async (req, res) => {
    const movies = await getAllMovies();
    res.render("home", { movies });
  },
  detailsController: async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);

    if (!movie) {
      res.render("404");
      return
    }

    movie.starRating = '&#x2605;'.repeat(movie.rating)

    res.render("details", { movie });
  },
  createGetController: (req, res) => {
    res.render("create");
  },
  //createPostController

  searchController: (req, res) => {
    res.render("search");
  },
};
