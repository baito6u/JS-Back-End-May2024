//TODO imprt routers

const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");

function routesConfig(app) {
  //TODO register routers
  app.use(homeRouter);
  app.use(userRouter);
}

module.exports = { routesConfig };
