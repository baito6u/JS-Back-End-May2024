const cookieParser = require("cookie-parser");
const express = require("express");
const handlebars = require("express-handlebars");

function expressConfig(app) {
  const hbs = handlebars.create({
    extname: "hbs",
  });

  app.engin("hbs", hbs.engine);
  app.set("view engin", "hbs");

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser);
  
  //TODO add session middlware
}

module.exports = { expressConfig };
