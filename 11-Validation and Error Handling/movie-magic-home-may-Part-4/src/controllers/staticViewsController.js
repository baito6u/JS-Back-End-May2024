const { Router } = require("express");

const staticViewsRouter = Router();

staticViewsRouter.get("/about", (req, res) => {
  res.render("about");
});

staticViewsRouter.get("*", (req, res) => {
  res.render("404");
});

module.exports = { staticViewsRouter };
