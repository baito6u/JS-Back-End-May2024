const router = require("express").Router();

const authRouter = require("./controllers/authController");
const homeRouter = require("./controllers/homeController");

router.use(homeRouter);
router.use(authRouter);

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
