const express = require("express");

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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log("Created by Todor Krumov");
