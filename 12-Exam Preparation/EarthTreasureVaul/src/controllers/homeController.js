const homeRouter = require("express").Router();

const { getRecent, getAll, getById } = require("../services/stoneService");

homeRouter.get("/", async (req, res) => {
  const stones = await getRecent();

  res.render("home", { stones });
});

homeRouter.get("/catalog", async (req, res) => {
  const stones = await getAll();

  res.render("catalog", { stones });
});

homeRouter.get("/catalog/:id", async (req, res) => {
  const stone = await getById(req.params.id);

  if (!stone) {
    res.render("404");
  }

  const isOwner = req.user?._id == stone.author.toString();
  const hasLiked = Boolean(stone.likes.find((l) => req.user?._id == l.toString()));

  res.render("details", { stone, isOwner, hasLiked });
});

module.exports = { homeRouter };
