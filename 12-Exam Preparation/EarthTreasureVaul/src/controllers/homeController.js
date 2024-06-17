const { createToken } = require("../services/jwt");
const { login } = require("../services/userService");

const homeRouter = require("express").Router();

//TODO replace with real router according exam description
homeRouter.get("/", async (req, res) => {
    console.log(req.user);

    //This code creates a token and save it in a cookie
    // const result = await login("peter", "123456");
    // const token = createToken(result);
    // res.cookie("token", token);

    res.render("home");
})

module.exports = { homeRouter };