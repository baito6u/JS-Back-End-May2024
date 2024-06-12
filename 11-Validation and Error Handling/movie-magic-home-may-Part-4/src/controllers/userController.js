const { Router } = require("express");


const { register, login } = require("../services/userService");
const { createToken } = require("../services/tokenService");
const { isGuest } = require("../middlewares/guards");

const userRouter = Router();

userRouter.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

userRouter.post("/register", 
  isGuest(), 
  
  async (req, res) => {
  
    const { email, password, repass } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required!");
    }
    if (password != repass) {
      throw new Error("Passwords do not match");
    }

    const user = await register(email, password);
    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("register", { data: { email }, error: err.message });
    return;
  }
});

userRouter.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

userRouter.post("/login", isGuest(), async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required!");
    }

    const user = await login(email, password);
    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("login", { data: { email }, error: err.message });
    return;
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = { userRouter };
