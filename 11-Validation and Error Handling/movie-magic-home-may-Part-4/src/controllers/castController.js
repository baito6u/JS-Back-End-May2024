const { Router } = require("express");

const castService = require("../services/castService");
const { isUser } = require("../middlewares/guards");


const castRouter = Router();

castRouter.get("/create/cast", isUser(), (req, res) => {
  res.render("cast-create");
});

castRouter.post("/create/cast", isUser(), async (req, res) => {
  const newCast = req.body;

  try {
    await castService.create(newCast);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.status(400).end();
  }
});

module.exports = { castRouter };
