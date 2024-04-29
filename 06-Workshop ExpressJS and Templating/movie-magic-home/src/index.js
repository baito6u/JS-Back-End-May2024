const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const routes = require("./routes");

//setup express
const app = express();
const PORT = 5000;

//configure the static files in the public folder
app.use(express.static("src/public")); //path.join(__dirname, 'public'))

//setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs", //for setup extention name
  })
);
app.set("view engine", "hbs"); //setup view engin
app.set("views", path.join(__dirname, "views")); //change the default behavior of folder views
//app.set("views", "src/views")

//using the routes.js module
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log("Created by Todor Krumov");
