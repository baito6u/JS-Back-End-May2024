const cookieParser = require("cookie-parser");
const express = require("express");

function expressConfig(app) {
  app.use(cookieParser);
  //TODO add session middlware

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
}

module.exports = { expressConfig };
