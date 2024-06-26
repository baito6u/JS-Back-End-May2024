const { register, login } = require("../services/userService");

const userRouter = require("express").Router();

userRouter.post("/register", async (req, res) => {
  const userData = req.body;

  const result = await register(userData);

  res.json(result);
});

userRouter.post("/login", async (req, res) => {
    const userData = req.body;
  
    const result = await login(userData);
  
    res.json(result);
  });

module.exports = userRouter;
