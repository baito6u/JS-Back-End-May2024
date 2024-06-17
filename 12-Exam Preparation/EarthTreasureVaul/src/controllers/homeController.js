const { createToken } = require("../services/jwt");
const { login } = require("../services/userService");

const homeRouter = require("express").Router();

//TODO replace with real router according exam description
homeRouter.get("/", async (req, res) => {
    

    res.render("home");
})

module.exports = { homeRouter };