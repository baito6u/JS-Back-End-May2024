const { Router } = require("express");
const { body, validationResult } = require('express-validator')

const {
  getAllMovies,
  getMovieById,
  createMovie,
  search,
  editMovie,
  deleteMovie,
} = require("../services/movieService");

const { parseError } = require("../util");

const { isUser } = require("../middlewares/guards");

const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
  const movies = await getAllMovies();

  for (const movie of movies) {
    movie.isAuthor = req.user && req.user._id == movie.author.toString();
  }

  res.render("home", { movies });
});

movieRouter.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await getMovieById(id);

  if (!movie) {
    res.render("404");
    return;
  }

  movie.isAuthor = req.user && req.user._id == movie.author.toString();

  movie.starRating = "&#x2605;".repeat(movie.rating);

  res.render("details", { movie });
});

movieRouter.get("/create/movie", isUser(), (req, res) => {
  res.render("create");
});

movieRouter.post(
  "/create/movie", 
  isUser(), 
  body('imageURL').trim().isURL().withMessage('Please enter valid image URL!'),
  async (req, res) => {
  const authorId = req.user._id;

  try {
    const validationResult = validationResult(req);

    if(validationResult.errors.length) {
      throw validationResult.errors;
    }

    const result = await createMovie(req.body, authorId);
    res.redirect("/details/" + result._id);
  } catch (err) {
   
    res.render("create", { movie: req.body, errors: parseError(err).errors });
  }
});

movieRouter.get("/edit/:id", isUser(), async (req, res) => {
  const movieId = req.params.id;
  let movie = "";
  try {
    movie = await getMovieById(movieId);
    if (!movie) {
      throw new Error("Movie not found!");
    }
  } catch (error) {
    res.render("404");
    return;
  }

  const isAuthor = req.user._id == movie.author.toString();

  if (!isAuthor) {
    res.redirect("/login");
    return;
  }
  res.render("edit", { movie });
});

movieRouter.post("/edit/:id", isUser(), async (req, res) => {
  const movieId = req.params.id;
  const authorId = req.user._id;

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
    res.render("edit", { movie: req.body, errors });
    return;
  }

  try {
    await editMovie(movieId, req.body, authorId);
  } catch (error) {
    if (error.message == "Access denied") {
      res.redirect("/login");
    } else {
      res.render("404");
    }
    return;
  }
  res.redirect("/details/" + movieId);
});

movieRouter.get("/search", async (req, res) => {
  const movies = await search(req.query);

  if (!movies) {
    res.render("404");
    return;
  }
  res.render("search", { movies, query: req.query });
});

movieRouter.get("/delete/:id", isUser(), async (req, res) => {
  const movieId = req.params.id;
  let movie = "";
  try {
    movie = await getMovieById(movieId);
    if (!movie) {
      throw new Error("Movie not found!");
    }
  } catch (error) {
    res.render("404");
    return;
  }

  const isAuthor = req.user._id == movie.author.toString();

  if (!isAuthor) {
    res.redirect("/login");
    return;
  }
  res.render("delete", { movie });
});

movieRouter.post("/delete/:id", isUser(), async (req, res) => {
  const movieId = req.params.id;
  const authorId = req.user._id;

  try {
    await deleteMovie(movieId, authorId);
  } catch (error) {
    if (error.message == "Access denied") {
      res.redirect("/login");
    } else {
      res.render("404");
    }
    return;
  }
  res.redirect("/");
});

module.exports = { movieRouter };
