const { Movie } = require("../models/Movie");
const { getAllCasts } = require("../services/castService");
const { getMovieById, attachCastToMovie } = require("../services/movieService");

module.exports = {
  attachGetController: async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);

    if (!movie) {
      res.render("404");
      return;
    }

    const allCast = await getAllCasts(id);

    res.render("cast-attach", { movie, allCast });
  },
  attachPostController: async (req, res) => {
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
  },
};
