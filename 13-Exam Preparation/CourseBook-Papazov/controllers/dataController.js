const { isAuth } = require("../middlewares/authMiddleware");
const { estimatedDocumentCount } = require("../models/Data");
const {
  createData,
  getAll,
  getOne,
  getOneDetailed,
  signUp,
  deleteData,
  edit,
} = require("../services/dataService");
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
  const signUpUsers = singleData.signUpList
    .map((user) => user.username)
    .join(", ");
  const isOwner = singleData.owner._id == req.user?._id;
  const isSigned = singleData.signUpList.some(
    (user) => user._id == req.user?._id
  );
  res.render("details", { ...singleData, signUpUsers, isOwner, isSigned });
});

dataRouter.get("/sign-up/:dataId", async (req, res) => {
  await signUp(req.params.dataId, req.user._id);

  res.redirect(`/details/${req.params.dataId}`);
});

dataRouter.get("/delete/:dataId", isDataOwner, async (req, res) => {
  await deleteData(req.params.dataId);

  res.redirect("/catalog");
});

dataRouter.get("/edit/:dataId", isDataOwner, async (req, res) => {
  const data = await getOne(req.params.dataId).lean();

  res.render("edit", { ...data });
});

dataRouter.post("/edit/:dataId", isDataOwner, async (req, res) => {
  const data = req.body;

  try{
      await edit(req.params.dataId, data).lean();
      res.render(`/details/${dataId}`);
  } catch(err) {

  }

});

async function isDataOwner(req, res, next) {
  const data = await getOne(req.params.dataId);

  if (data.owner != req.user?._id) {
    return res.redirect(`/details/${req.params.dataId}`);
  }

  next();
}

module.exports = dataRouter;
