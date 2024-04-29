const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = 5000;

//setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs", //for setup extention name
  })
);
app.set("view engine", "hbs"); //setup view engin
app.set('views', path.join(__dirname, 'views')); //change the default behavior of folder views

//setup express
app.get("/", (req, res) => {
  res.render('home', {layout: false})
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log("Created by Todor Krumov");
