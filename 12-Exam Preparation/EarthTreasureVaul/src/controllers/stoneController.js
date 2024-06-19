const stoneRouter = require("express").Router();

const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { create } = require("../services/stoneService");
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

module.exports = { stoneRouter };
