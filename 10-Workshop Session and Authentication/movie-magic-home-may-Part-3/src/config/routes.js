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
  editGetController,
  editPostController,
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

const { isGuest, isUser } = require("../middlewares/guards");

const router = require("express").Router();

//common
router.get("/", homeContoller);
router.get("/about", aboutController);
router.get("/search", searchController);

//a specific movie
router.get("/details/:id", detailsController);
router.get("/attach/:id", isUser(), attachGetController);
router.post("/attach/:id", isUser(), attachPostController);
router.get("/edit/:id", isUser(), editGetController);
router.post("/edit/:id", isUser(), editPostController);

//for creatin movie/cast
router.get("/create/movie", isUser(), createGetController);
router.post("/create/movie", isUser(), createPostController);
router.get("/create/cast", isUser(), createCastGetController);
router.post("/create/cast", isUser(), createCastPostController);

//user
router.get("/register", isGuest(), registerGetController);
router.post("/register", isGuest(), registerPostController);
router.get("/login", isGuest(), loginGetController);
router.post("/login", isGuest(), loginPostController);
router.get("/logout", logoutController);

//all other
router.get("*", notFoundController);

module.exports = { router };
