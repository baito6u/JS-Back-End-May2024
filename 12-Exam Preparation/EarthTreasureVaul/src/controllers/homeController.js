const homeRouter = require("express").Router();

//TODO replace with real router according exam description

homeRouter.get("/", (req, res) => {
  const minerals = [];

  res.render("home", { minerals });
});

module.exports = { homeRouter };
