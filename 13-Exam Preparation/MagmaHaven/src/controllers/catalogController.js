const catalogRouter = require("express").Router();

const { getAll } = require("../services/dataService");

catalogRouter.get("/catalog", async (req, res) => {
  const volcanoes = await getAll();

  res.render("catalog", { volcanoes });
});

module.exports = { catalogRouter };
