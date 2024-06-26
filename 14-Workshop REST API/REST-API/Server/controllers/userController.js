const { register } = require("../services/userService");

const userRouter = require("express").Router();

userRouter.post("/register", async (req, res) => {
  const userData = req.body;

  const result = await register(userData);

  res.json(result);
});

module.exports = userRouter;
