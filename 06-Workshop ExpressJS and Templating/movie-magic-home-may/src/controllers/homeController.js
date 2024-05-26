module.exports = {
  homeContoller: (req, res) => {
    res.render("home");
  },
  aboutController: (req, res) => {
    res.render("about");
  },
  notFoundController: (req, res) => {
    res.render("404")
  }
};
