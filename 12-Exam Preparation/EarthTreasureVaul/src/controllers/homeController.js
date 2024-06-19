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

  if(!stone) {
    res.render("404");
  }

  res.render("details", { stone });
});

module.exports = { homeRouter };
