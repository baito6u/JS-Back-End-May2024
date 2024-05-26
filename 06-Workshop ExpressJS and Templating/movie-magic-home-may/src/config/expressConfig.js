const express = require("express");

function expresConfig(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
}

module.exports = { expresConfig };
