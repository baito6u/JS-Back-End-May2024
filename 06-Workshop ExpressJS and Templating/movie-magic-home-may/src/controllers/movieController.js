module.exports = {
    homeContoller: (req, res) => {
        res.render("home");
    },
    detailsController: (req, res) => {
        res.render("details");
    },
    createGetController: (req, res) => {
        res.render("create");
    },
    
}