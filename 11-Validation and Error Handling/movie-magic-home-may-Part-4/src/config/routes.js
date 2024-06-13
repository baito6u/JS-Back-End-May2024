const { attachRouter } = require("../controllers/attachController");
const { castRouter } = require("../controllers/castController");
const { movieRouter } = require("../controllers/movieController");
const { staticViewsRouter } = require("../controllers/staticViewsController");
const { userRouter } = require("../controllers/userController");

function configRoutes(app) {
  app.use(movieRouter);
  app.use(userRouter);
  app.use(attachRouter);
  app.use(castRouter);
  app.use(staticViewsRouter);
}

module.exports = { configRoutes };
