//TODO imprt routers

const { homeRouter } = require("../controllers/homeController");

function routesConfig(app) {
  //TODO register routers
  app.use(homeRouter);
}

module.exports = { routesConfig };
