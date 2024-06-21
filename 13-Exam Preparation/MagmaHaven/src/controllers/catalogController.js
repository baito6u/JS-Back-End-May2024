const catalogRouter = require("express").Router();

catalogRouter.get("/catalog", (req, res) => {
  res.render("catalog");
});

module.exports = { catalogRouter };
