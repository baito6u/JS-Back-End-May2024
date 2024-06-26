const homeRouter = require("../controllers/homeController");

const router = require("express").Router();

const authRouter = require("../controllers/authController");
//const dataRouter = require("./controllers/dataController");

router.use(homeRouter);
router.use(authRouter);
// router.use(dataRouter);

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
