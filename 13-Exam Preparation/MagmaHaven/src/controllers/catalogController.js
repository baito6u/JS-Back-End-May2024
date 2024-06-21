const catalogRouter = require("express").Router();

const { getAll, getById } = require("../services/dataService");

catalogRouter.get("/catalog", async (req, res) => {
  const volcanoes = await getAll();

  res.render("catalog", { volcanoes });
});

catalogRouter.get("/catalog/:id", async (req, res) => {
  const id = req.params.id;
  const volcano = await getById(id);

  if (!volcano) {
    res.status(404).render("404");
    return;
  }

  volcano.votes = volcano.voteList.length;
  volcano.hasUser = res.locals.hasUser;
  //TODO add isAuthor and hasVoted properties

  res.render("details", { volcano });
});

module.exports = { catalogRouter };
