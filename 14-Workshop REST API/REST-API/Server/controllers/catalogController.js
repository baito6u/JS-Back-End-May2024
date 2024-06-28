const { getAll, create, getOne, edit, deleteData } = require("../services/dataService");

const catalogRouter = require("express").Router();

catalogRouter.get("/catalog", async (req, res) => {
  console.log(req.query);
  const data = await getAll();

  res.json(data);
});

catalogRouter.post("/catalog", async (req, res) => {
  const data = req.body;
  
  const furnitures = await create({...data, owner: req.user._id });
  
  res.json(furnitures);
});

catalogRouter.get("/catalog/:dataId", async (req, res) => {
  const singleData = await getOne(req.params.dataId);

  res.json(singleData);
});

catalogRouter.put("/catalog/:dataId", async (req, res) => {
  const data = req.body;
  const singleData = await edit(req.params.dataId, data);

  res.json(singleData);
});

catalogRouter.delete("/catalog/:dataId", async (req, res) => {
  
  await deleteData(req.params.dataId);

  res.json({ok: true});
});


module.exports = catalogRouter;
