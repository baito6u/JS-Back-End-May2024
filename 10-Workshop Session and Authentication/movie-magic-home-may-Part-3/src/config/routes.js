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

const { isGuest, isUser } = require("../middlewares/guards");

const router = require("express").Router();

router.get("/", homeContoller);
router.get("/about", aboutController);
router.get("/details/:id", detailsController);
router.get("/attach/:id", isUser(), attachGetController);
router.post("/attach/:id", isUser(), attachPostController);
router.get("/create/movie", isUser(), createGetController);
router.post("/create/movie", isUser(), createPostController);
router.get("/create/cast", isUser(), createCastGetController);
router.post("/create/cast", isUser(), createCastPostController);
router.get("/search", searchController);
router.get("/register", isGuest(), registerGetController);
router.post("/register", isGuest(), registerPostController);
router.get("/login", isGuest(), loginGetController);
router.post("/login", isGuest(), loginPostController);
router.get("/logout", logoutController);

router.get("*", notFoundController);

module.exports = { router };
