const express = require("express");
const mongoose = require('mongoose');

const configHandlebars = require("./config/handlebarsConfig");
const configExpress = require("./config/expressConfig");
const routes = require("./routes");

//setup express
const app = express();
const PORT = 5000;

configExpress(app);
configHandlebars(app);

//using the routes.js module
app.use(routes);

mongoose.connect(`mongodb://localhost:27017/movies`)
    .then(() => {
        console.log(`DB Connected`);

        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    })
    .catch(err => console.log('Cannot connect to DB'));

//mongoose.connection.on('error', (err) => console.log(err));

console.log("Created by Todor Krumov");
