const express = require("express");
const cors = require("cors");

const PORT = 3030;
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.get("/data/catalog", (req, res) => {
  res.json([]);
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
