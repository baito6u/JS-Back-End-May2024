const express = require("express");

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`));
