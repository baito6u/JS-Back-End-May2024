const { getRecent } = require("../services/dataService");

const homeRouter = require("express").Router();

homeRouter.get("/", async (req, res) => {
  const lastData = await getRecent();

  res.render("home", {lastData});
});

module.exports = homeRouter;
