const { register } = require("../services/userService");

const userRouter = require("express").Router();

userRouter.post("/register", async (req, res) => {
  const userData = req.body;

  const { _id, email, token } = await register(userData);

  res.json({
    _id,
    email,
    accessToken: token,
  });
});

module.exports = userRouter;
