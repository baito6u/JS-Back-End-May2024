const userRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

const { isGuest } = require("../middlewares/guards");
const { createToken } = require("../services/jwt");
const { login, register } = require("../services/userService");
const { parseError } = require("../utils");

userRouter.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

userRouter.post(
  "/login",
  isGuest(),
  body("email").trim(),
  body("password").trim(),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await login(email, password);
      const token = createToken(result);
      res.cookie("token", token);

      res.redirect("/");
    } catch (err) {
      res.render("login", { data: { email }, errors: parseError(err).errors });
    }
  }
);

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

userRouter.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

userRouter.post(
  "/register",
  isGuest(),
  body("username").trim().isLength({ min: 2 }),
  body("email").trim().isLength({ min: 10 }).isEmail(),
  body("password").trim().isLength({ min: 4 }),
  body("repass")
    .trim()
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Passwords don't match!"),
  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }
      
      const result = await register(username, email, password);
      const token = createToken(result);
      res.cookie("token", token);

      res.redirect("/");
    } catch (err) {
      res.render("register", {
        data: { username, email },
        errors: parseError(err).errors
      });
    }
  }
);

module.exports = { userRouter };
