const userRouter = require("express").Router();

const { isGuest } = require("../middlewares/guards");
const { createToken } = require("../services/jwt");
const { register } = require("../services/userService");

userRouter.get("/register", isGuest(), async (req, res) => {
  res.render("register");
});

userRouter.post("/register", isGuest(), async (req, res) => {
  const { email, password } = req.body;

  try {
    //TODO add validation
    const result = await register(email, password);
    const token = createToken(result);

    res.cookie("token", token);
  } catch (error) {
    res.render("register", { data: { email }, errors: error.errors });
  }
});

module.exports = { userRouter };
