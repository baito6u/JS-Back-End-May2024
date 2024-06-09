const {
  attachGetController,
  attachPostController,
} = require("../controllers/attachController");
const {
  createCastGetController,
  createCastPostController,
} = require("../controllers/castController");
const {
  homeContoller,
  detailsController,
  createGetController,
  searchController,
  createPostController,
} = require("../controllers/movieController");
const {
  aboutController,
  notFoundController,
} = require("../controllers/staticViewsController");
const {
  registerGetController,
  registerPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", homeContoller);
router.get("/about", aboutController);
router.get("/details/:id", detailsController);
router.get("/attach/:id", attachGetController);
router.post("/attach/:id", attachPostController);
router.get("/create/movie", createGetController);
router.post("/create/movie", createPostController);
router.get("/create/cast", createCastGetController);
router.post("/create/cast", createCastPostController);
router.get("/search", searchController);
router.get("/register", registerGetController);
router.post("/register", registerPostController);
router.get("/login", loginGetController);
router.post("/login", loginPostController);
router.get("/logout", logoutController);

router.get("*", notFoundController);

module.exports = { router };
