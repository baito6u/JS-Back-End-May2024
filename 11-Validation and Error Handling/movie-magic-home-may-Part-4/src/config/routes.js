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
  deleteGetController,
  deletePostController,
} = require("../controllers/movieController");
const {
  aboutController,
  notFoundController,
} = require("../controllers/staticViewsController");
const { userRouter } = require("../controllers/userController");

const { isGuest, isUser } = require("../middlewares/guards");

const router = require("express").Router();

function configRoutes(app) {}

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
router.get("/delete/:id", isUser(), deleteGetController);
router.post("/delete/:id", isUser(), deletePostController);

//for creatin movie/cast
router.get("/create/movie", isUser(), createGetController);
router.post("/create/movie", isUser(), createPostController);
router.get("/create/cast", isUser(), createCastGetController);
router.post("/create/cast", isUser(), createCastPostController);

//user
router.use(userRouter);

//all other
router.get("*", notFoundController);

module.exports = { router };
