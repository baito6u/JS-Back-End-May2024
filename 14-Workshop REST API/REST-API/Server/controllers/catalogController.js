const { getAll, create, getOne } = require("../services/dataService");

const catalogRouter = require("express").Router();

catalogRouter.get("/catalog", async (req, res) => {
    const data = await getAll();

    res.json(data);
});

catalogRouter.get("/:dataId", async (req, res) => {
    const singleData = await getOne(req.params.dataId);

    res.json(singleData);
})

catalogRouter.post("/", async (req, res) => {
  const data = req.body;

  const furnitures = await create(data);

  res.json(furnitures);
});

module.exports = catalogRouter;
