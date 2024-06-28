const { getAll, create, getOne } = require("../services/dataService");

const catalogRouter = require("express").Router();

catalogRouter.get("/catalog", async (req, res) => {
  const data = await getAll();

  res.json(data);
});

catalogRouter.post("/catalog", async (req, res) => {
  const data = req.body;
  
  const furnitures = await create(data);
  
  res.json(furnitures);
});

catalogRouter.get("/catalog/:dataId", async (req, res) => {
  const singleData = await getOne(req.params.dataId);

  res.json(singleData);
});
module.exports = catalogRouter;
