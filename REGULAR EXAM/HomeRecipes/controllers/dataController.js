const { isAuth } = require("../middlewares/authMiddleware");
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

dataRouter.get("/catalog", async (req, res) => {
  const data = await getAll().lean();
  res.render("catalog", { data });
});

dataRouter.get("/details/:id", async (req, res) => {
  const singleData = await getOneDetailed(req.params.id).lean();
  const signUpUsers = singleData.recommendList.map((user) => user.username).join(", ");
  const isOwner = singleData.owner._id == req.user?._id;
  const isSigned = singleData.recommendList.some(
    (user) => user._id == req.user?._id
  );
  res.render("details", { ...singleData, signUpUsers, isOwner, isSigned });
});

// dataRouter.get("/details/:id", async (req, res) => {
//   const singleData = await getOne(req.params.id).lean();

//   res.render("details", singleData);
// });

dataRouter.get("/sign-up/:dataId", async (req, res) => {
  await signUp(req.params.dataId, req.user._id);

  res.redirect(`/details/${req.params.dataId}`);
});

dataRouter.get("/delete/:dataId", isDataOwner, async (req, res) => {
  await deleteData(req.params.dataId);

  res.redirect("/catalog");
});

dataRouter.get("/edit/:dataId", isDataOwner, async (req, res) => {

  res.render("edit", { ...req.data });
});

dataRouter.post("/edit/:dataId", isDataOwner, async (req, res) => {
  const data = req.body;

  try {
    await edit(req.params.dataId, data);
    res.redirect(`/details/${req.params.dataId}`);
  } catch (err) {
    res.render("edit", {...data, error: getErrorMessage(err)})
  }
});

dataRouter.get("/search", async (req, res) => {
  
  res.render("search")
});

async function isDataOwner(req, res, next) {
  const data = await getOne(req.params.dataId).lean();

  if (data.owner != req.user?._id) {
    return res.redirect(`/details/${req.params.dataId}`);
  }

  req.data = data;
  next();
}

module.exports = dataRouter;
