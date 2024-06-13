const { Router } = require('express');

const { getAllCasts } = require("../services/castService");
const { getMovieById, attachCastToMovie } = require("../services/movieService");
const { isUser } = require("../middlewares/guards");

const attachRouter = Router();

attachRouter.get("/attach/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const movie = await getMovieById(id);

  if (!movie) {
    res.render("404");
    return;
  }

  const allCast = await getAllCasts();

  const castInMovie = movie.cast.map(id => id.toString())

  res.render("cast-attach", { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
});

attachRouter.post("/attach/:id", isUser(), async (req, res) => {
  const movieId = req.params.id;
  const castId = req.body.cast;

  if (!movieId || !castId) {
    console.error(`Missing data, ${movieId}, ${castId}`);
    res.status(400).end();
    return;
  }

  if (castId == "none") {
    const movie = await getMovieById(movieId);
    const allCast = await getAllCasts();

    res.render("cast-attach", { movie, allCast, error: true });

    return;
  }

  try {
    await attachCastToMovie(movieId, castId);
  } catch (error) {
      console.error('Error adding casst to movie', error);
    res.status(400).end();
    return;
  }

  res.redirect("/details/" + movieId);
});

module.exports = { attachRouter };
