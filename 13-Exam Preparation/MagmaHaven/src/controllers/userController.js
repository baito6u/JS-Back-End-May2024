const userRouter = require("express").Router();

const { isGuest } = require("../middlewares/guards");
const { createToken } = require("../services/jwt");
const { login } = require("../services/userService");

//This code creates a token and save it in a cookie
// const result = await login("peter", "123456");
// const token = createToken(result);
// res.cookie("token", token);

userRouter.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

userRouter.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

module.exports = { userRouter };
