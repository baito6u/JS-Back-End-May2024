const volcanoRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

const { isUser } = require("../middlewares/guards");
const { getById } = require("../services/dataService");
const { parseError } = require("../utils");
const { create } = require("../services/dataService");

volcanoRouter.get("/create", isUser(), (req, res) => {
  res.render("create");
});

volcanoRouter.post(
  "/create",
  isUser(),
  body("name").trim().isLength({ min: 2 }),
  body("location").trim().isLength({ min: 3 }),
  body("elevation").trim().isInt({ min: 0 }),
  body("lastEruption").trim().isInt({ min: 0, max: 2024 }),
  body("image").trim().isURL({ require_tld: false, require_protocol: true }),
  body("typeVolcano").trim(),
  body("description").trim().isLength({ min: 10 }),
  async (req, res) => {
    const userId = req.user._id;

    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await create(req.body, userId);

      res.redirect("/");
    } catch (err) {
      res.render("create", {
        data: req.body,
        errors: parseError(err).errors,
      });
    }
  }
);

volcanoRouter.get("/edit/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const volcano = await getById(id);

  if (!volcano) {
    res.status("404");
    return;
  }

  if (volcano.author.toString() != req.userId) {
    res.redirect("/login");
  }
  res.render("edit", { data: volcano });
});

volcanoRouter.post(
  "/edit/:volcanoId",
  isUser(),
  body("name").trim().isLength({ min: 2 }),
  body("location").trim().isLength({ min: 3 }),
  body("elevation").trim().isInt({ min: 0 }),
  body("lastEruption").trim().isInt({ min: 0, max: 2024 }),
  body("image").trim().isURL({ require_tld: false, require_protocol: true }),
  body("typeVolcano").trim(),
  body("description").trim().isLength({ min: 10 }),
  async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user._id;

    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await create(req.body, userId);

      res.redirect("/catalog/" + volcanoId);
    } catch (err) {
      res.render("edit", {
        data: req.body,
        errors: parseError(err).errors,
      });
    }
  }
);

module.exports = { volcanoRouter };
