//TODO imprt routers

const { catalogRouter } = require("../controllers/catalogController");
const { homeRouter } = require("../controllers/homeController");

function routesConfig(app) {
  //TODO register routers
  app.use(homeRouter);
  app.use(catalogRouter);
}

module.exports = { routesConfig };
