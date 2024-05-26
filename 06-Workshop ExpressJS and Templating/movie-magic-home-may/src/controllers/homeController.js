module.exports = {
  homeContoller: (req, res) => {
    res.render("home");
  },
  aboutController: (req, res) => {
    res.render("about");
  },
  notFoundController: (req, res) => {
    res.render("404");
  },
  detailsController: (req, res) => {
    res.render("details");
  },
};
