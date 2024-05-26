const { getAllMovies, getMovieById, createMovie } = require("../services/movieService");

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
      return;
    }

    movie.starRating = "&#x2605;".repeat(movie.rating);

    res.render("details", { movie });
  },

  createGetController: (req, res) => {
    res.render("create");
  },

  createPostController: async (req, res) => {
    const result = await createMovie(req.body);

    res.redirect('/details/' + result.id);
  },

  searchController: (req, res) => {
    res.render("search");
  },
};
