const router = require("express").Router();

const catalogRouter = require("./controllers/catalogController");
const userController = require("./controllers/userController");

router.use("/users", userController);
router.use("/data/", catalogRouter);

module.exports = router;
