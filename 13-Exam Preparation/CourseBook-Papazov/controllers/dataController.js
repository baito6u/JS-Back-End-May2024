const { isAuth } = require("../middlewares/authMiddleware");
const { createData, getAll, getOne, getOneDetailed } = require("../services/dataService");
const { getErrorMessage } = require("../utils/errorUtil");

const dataRouter = require("express").Router();

dataRouter.get("/create", isAuth(), (req, res) => {
  res.render("create");
});

dataRouter.post("/create", isAuth(), async (req, res) => {
  const data = req.body;

  try {
    await createData(req.user._id, data);

    res.redirect("/catalog");
  } catch (err) {
    res.render("create", { ...data, error: getErrorMessage(err) });
  }
});

dataRouter.get("/catalog", isAuth(), async (req, res) => {
  const data = await getAll().lean();
  res.render("catalog", { data });
});

dataRouter.get("/details/:id", async (req, res) => {
  const singleData = await getOneDetailed(req.params.id).lean();

  res.render("details", { ...singleData });
});

module.exports = dataRouter;
