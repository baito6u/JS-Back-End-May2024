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
  volcano.isAuthor = req.user?._id == volcano.author.toString();
  volcano.hasVoted = Boolean(volcano.voteList.find(v => v.toString() == req.user?._id));

  res.render("details", { volcano });
});

module.exports = { catalogRouter };
