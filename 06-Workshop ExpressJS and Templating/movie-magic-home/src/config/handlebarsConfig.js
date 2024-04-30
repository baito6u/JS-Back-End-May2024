const handlebars = require("express-handlebars");
const path = require("path");

function configHandlebars(app) {
  app.engine("hbs", handlebars.engine({
      extname: "hbs", //for setup extention name
    }));
  app.set("view engine", "hbs"); //setup view engin
  app.set("views", path.join(__dirname, "views")); //change the default behavior of folder views
  //app.set("views", "src/views")

  return app;
}

module.exports = configHandlebars;
