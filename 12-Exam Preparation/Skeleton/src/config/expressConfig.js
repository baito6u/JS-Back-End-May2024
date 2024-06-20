const cookieParser = require("cookie-parser");
const express = require("express");
const { session } = require("../middlewares/session");

const secret = "cookie secret";

function expressConfig(app) {
  app.use(cookieParser(secret));
  app.use(session());
  //TODO add session middlware

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
}

module.exports = { expressConfig };
