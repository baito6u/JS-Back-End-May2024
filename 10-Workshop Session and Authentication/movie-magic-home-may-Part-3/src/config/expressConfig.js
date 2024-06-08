const express = require("express");
const cookieParser = require("cookie-parser");

const secret = "big secret";

function expresConfig(app) {
  app.use(cookieParser(secret));
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
}

module.exports = { expresConfig };
