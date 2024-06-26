const { getAll, create } = require("../services/dataService");

const catalogRouter = require("express").Router();

catalogRouter.post("/", async (req, res) => {
  const data = req.body;

  const furnitures = await create(data);

  res.json(furnitures);
});

module.exports = catalogRouter;
