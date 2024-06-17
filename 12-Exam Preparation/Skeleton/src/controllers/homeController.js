const homeRouter = require("express").Router();

//TODO replace with real router according exam description
homeRouter.get("/", (req, res) => {
    console.log(req.user);

    res.render("home");
})

module.exports = { homeRouter };