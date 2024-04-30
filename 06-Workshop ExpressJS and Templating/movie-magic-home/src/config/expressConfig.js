const express = require('express');
const path = require("path");

function configExpress(app) {
    //configure the static files in the public folder
app.use(express.static("src/public")); //path.join(__dirname, 'public'))

    return app;
}

module.exports = configExpress;