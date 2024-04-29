const express = require("express");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log("Created by Todor Krumov");
