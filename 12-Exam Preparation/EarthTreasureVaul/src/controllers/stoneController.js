const stoneRouter = require("express").Router();

stoneRouter.get("/create", async (req, res) => {
  res.render("create");
});

module.exports = { stoneRouter };
