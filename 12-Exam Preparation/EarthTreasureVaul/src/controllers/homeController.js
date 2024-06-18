const homeRouter = require("express").Router();

//TODO replace with real router according exam description

homeRouter.get("/", (req, res) => {
  const minerals = [1, 2, 3, 4];

  res.render("home", { minerals });
});

module.exports = { homeRouter };
