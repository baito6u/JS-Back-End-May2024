const {
  getAllMovies,
  getMovieById,
  createMovie,
  search,
} = require("../services/movieService");

const jwt = require('jsonwebtoken')

module.exports = {
  homeContoller: async (req, res) => {
    const headers = {
      alg: 'HSS256',
      typ: 'JWT'
    };
    const data = {
      message: 'hello'
    };
    const token = jwt.sign(data, 'top secret');
    console.log(token);

    res.cookie("token", token, { httpOnly: true });
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
    const errors = {
      title: !req.body.title,
      genre: !req.body.genre,
      director: !req.body.director,
      year: !req.body.year,
      imageURL: !req.body.imageURL,
      rating: !req.body.rating,
      description: !req.body.description,
    };

    if (Object.values(errors).includes(true)) {
      res.render("create", { movie: req.body, errors });
      return;
    }

    const result = await createMovie(req.body);

    res.redirect("/details/" + result._id);
  },

  searchController: async (req, res) => {
    const movies = await search(req.query);

    if (!movies) {
      res.render("404");
      return;
    }
    res.render("search", { movies, query: req.query });
  },
};
