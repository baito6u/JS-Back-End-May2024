const stoneRouter = require("express").Router();

const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const {
  create,
  getById,
  update,
  deleteById,
  likeStone,
} = require("../services/stoneService");
const { parseError } = require("../utils");

stoneRouter.get("/create", isUser(), async (req, res) => {
  res.render("create");
});

stoneRouter.post(
  "/create",
  isUser(),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("name Must be atleast 2 charecter long!"),
  body("category")
    .trim()
    .isLength({ min: 3 })
    .withMessage("category must be atleast 3 charecter long!"),
  body("color")
    .trim()
    .isLength({ min: 2 })
    .withMessage("color must be atleast 2 charecter long!"),
  body("image").trim().isURL().withMessage("image must be a valid URL!"),
  body("location")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("location must me between 5 and 15 charecter long!"),
  body("formula")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("formula must be between 3 and 30 charecter long!"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be atleast 10 charecter long!"),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await create(req.body, req.user._id);

      res.redirect("/catalog");
    } catch (err) {
      res.render("create", {
        data: req.body,
        errors: parseError(err).errors,
      });
    }
  }
);

stoneRouter.get("/edit/:id", isUser(), async (req, res) => {
  const stone = await getById(req.params.id);

  if (!stone) {
    res.render("404");
    return;
  }

  const isOwner = req.user._id == stone.author.toString();

  if (!isOwner) {
    res.redirect("/login");
    return;
  }

  res.render("edit", { data: stone });
});

stoneRouter.post(
  "/edit/:id",
  isUser(),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("name Must be atleast 2 charecter long!"),
  body("category")
    .trim()
    .isLength({ min: 3 })
    .withMessage("category must be atleast 3 charecter long!"),
  body("color")
    .trim()
    .isLength({ min: 2 })
    .withMessage("color must be atleast 2 charecter long!"),
  body("image").trim().isURL().withMessage("image must be a valid URL!"),
  body("location")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("location must me between 5 and 15 charecter long!"),
  body("formula")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("formula must be between 3 and 30 charecter long!"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be atleast 10 charecter long!"),
  async (req, res) => {
    const stoneId = req.params.id;
    const userId = req.user._id;

    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await update(stoneId, req.body, userId);

      res.redirect("/catalog/" + stoneId);
    } catch (err) {
      res.render("edit", {
        data: req.body,
        errors: parseError(err).errors,
      });
    }
  }
);

stoneRouter.get("/like/:id", isUser(), async (req, res) => {
  const stoneId = req.params.id;
  const userId = req.user._id;

  try {
    const result = await likeStone(stoneId, userId);

    res.redirect("/catalog/" + stoneId);
  } catch (err) {
    res.redirect("/");
  }
});

stoneRouter.get("/delete/:id", isUser(), async (req, res) => {
  const stoneId = req.params.id;
  const userId = req.user._id;

  try {
    const result = await deleteById(stoneId, userId);

    res.redirect("/");
  } catch (err) {
    res.redirect("/catalog" + stoneId);
  }
});

module.exports = { stoneRouter };
