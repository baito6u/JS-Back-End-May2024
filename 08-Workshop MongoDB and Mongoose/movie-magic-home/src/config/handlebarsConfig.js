const handlebars = require("express-handlebars");
const path = require("path");

function configHandlebars(app) {
  app.engine("hbs", handlebars.engine({
      extname: "hbs", //for setup extention name
    }));
  app.set("view engine", "hbs"); //setup view engin
  app.set("views", "src/views");
  //app.set("views", path.resolve("src/views")); //change the default behavior of folder views

  return app;
}

module.exports = configHandlebars;
