const express = require("express");
const router = express.Router(); // new instans of exxpress Router

const homeController = require("./controllers/homeController");
const movieController = require("./controllers/movieController");
const castController = require("./controllers/castController");

router.use(movieController);
router.use(homeController);
router.use('/cast', castController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
