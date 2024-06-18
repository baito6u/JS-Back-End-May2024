const homeRouter = require("express").Router();

const { getRecent } = require("../services/stoneService");

homeRouter.get("/", async (req, res) => {
  const stones = await getRecent();

  res.render("home", { stones });
});

module.exports = { homeRouter };
