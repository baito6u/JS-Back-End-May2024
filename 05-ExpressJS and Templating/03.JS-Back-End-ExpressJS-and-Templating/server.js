const express = require("express");
const app = express();
const port = 5555;

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to Express.JS!.");
});
app.listen(port, () => console.log(`Express running on port: ${port}...`));
