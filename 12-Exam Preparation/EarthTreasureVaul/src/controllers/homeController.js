const homeRouter = require("express").Router();

const { getRecent, getAll } = require("../services/stoneService");

homeRouter.get("/", async (req, res) => {
  const stones = await getRecent();

  res.render("home", { stones });
});

homeRouter.get("/catalog", async (req, res) => {
  const stones = await getAll();

  res.render("catalog", { stones });
});

module.exports = { homeRouter };
