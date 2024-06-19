const userRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

const { isGuest } = require("../middlewares/guards");
const { createToken } = require("../services/jwt");
const { register, login } = require("../services/userService");
const { parseError } = require("../utils");

userRouter.get("/register", isGuest(), async (req, res) => {
  res.render("register");
});

userRouter.post(
  "/register",
  isGuest(),
  body("email")
    .trim()
    .isEmail()
    .isLength({ min: 10 })
    .withMessage("Email must me at leas 10 charecters long!"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must me at leas 4 charecters long!"),
  body("repass")
    .trim()
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Passwords don't match!"),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const validation = validationResult(req);
      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await register(email, password);
      const token = createToken(result);

      res.cookie("token", token);
      res.redirect("/");
    } catch (err) {
      res.render("register", {
        data: { email },
        errors: parseError(err).errors,
      });
    }
  }
);

userRouter.get("/login", isGuest(), async (req, res) => {
  res.render("login");
});

userRouter.post(
  "/login",
  isGuest(),
  body("email").trim(),
  body("password").trim(),
  body("repass")
    .trim()
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Passwords don't match!"),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await login(email, password);
      const token = createToken(result);

      res.cookie("token", token);
      res.redirect("/");
    } catch (err) {
      res.render("login", {
        data: { email },
        errors: parseError(err).errors,
      });
    }
  }
);

userRouter.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = { userRouter };
