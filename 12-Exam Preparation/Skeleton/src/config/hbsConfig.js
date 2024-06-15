const handlebars = require("express-handlebars");

function hbsConfig(app) {
  const hbs = handlebars.create({
    extname: "hbs",
  });

  app.engin("hbs", hbs.engine);
  app.set("view engin", "hbs");
}

module.exports = { hbsConfig };
