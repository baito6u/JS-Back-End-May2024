const { getRecent } = require("../services/stoneService");

const homeRouter = require("express").Router();

//TODO replace with real router according exam description

homeRouter.get("/", async (req, res) => {
  const stones = await getRecent();

  res.render("home", { stones });
});

module.exports = { homeRouter };
