const {
  attachGetController,
  attachPostController,
} = require("../controllers/attachController");
const {
  createCastGetController,
  createCastPostController,
} = require("../controllers/castController");
const { movieRouter } = require("../controllers/movieController");
const {
  aboutController,
  notFoundController,
} = require("../controllers/staticViewsController");
const { userRouter } = require("../controllers/userController");

const { isGuest, isUser } = require("../middlewares/guards");


function configRoutes(app) {

  app.get("/about", aboutController);

  app.use(movieRouter);
  app.use(userRouter);

  app.get("/attach/:id", isUser(), attachGetController);
  app.post("/attach/:id", isUser(), attachPostController);

  //for creatin movie/cast

  app.get("/create/cast", isUser(), createCastGetController);
  app.post("/create/cast", isUser(), createCastPostController);

  //all other
  app.get("*", notFoundController);
}

module.exports = { configRoutes };
