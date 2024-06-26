const { isGuest, isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtil");

const authRouter = require("express").Router();

authRouter.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

authRouter.post("/register", isGuest(), async (req, res) => {
  const userData = req.body;

  try {
    const token = await authService.register(userData);

    res.cookie("auth", token);
    res.redirect("/");
  } catch (err) {
    res.render("register", { ...userData, error: getErrorMessage(err) });
  }
});

authRouter.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

authRouter.post("/login", isGuest(), async (req, res) => {
  const loginData = req.body;

  try {
    const token = await authService.login(loginData);
  
    res.cookie("auth", token);
  
    res.redirect("/");
  } catch (err){
    res.render("login", { ...loginData, error: getErrorMessage(err) });

  }
});

authRouter.get("/logout", isAuth(), (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = authRouter;
