//TODO imprt routers

const { catalogRouter } = require("../controllers/catalogController");
const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");

function routesConfig(app) {
  //TODO register routers
  app.use(homeRouter);
  app.use(catalogRouter);
  app.use(userRouter);
}

module.exports = { routesConfig };
