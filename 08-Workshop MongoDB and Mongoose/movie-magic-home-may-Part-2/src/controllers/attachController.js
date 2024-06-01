const { getAllCasts } = require("../services/castService");
const { getMovieById } = require("../services/movieService");

module.exports = {
  attachGetController: async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);

    if (!movie) {
      res.render("404");
      return;
    }

    const allCast = await getAllCasts();
    

    res.render("cast-attach", { movie, allCast });
  },
  attachPostController: (req, res) => {},
};
