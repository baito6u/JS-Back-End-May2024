const express = require("express");
const path = require("path");

function configExpress(app) {
  //configure the static files in the public folder
  app.use(express.static("src/public")); //path.resolve('src/public'))
  app.use(express.urlencoded({ extended: false })); //configuring middleware for parsing incoming request bodies from create form and make the data accessible via the req.body object. 
  return app;
}

module.exports = configExpress;
