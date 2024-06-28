const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes");
const { authMiddleware } = require("./middlewares/authMiddleware");

const PORT = 3030;
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

app.use(cors());
app.use(express.json()); // parse data from forms
app.use(authMiddleware);

app.use(router);

mongoose
  .connect("mongodb://localhost:27017/furniture")
  .then(() => console.log("DB is connected!"));

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
