module.exports = {
  aboutController: (req, res) => {
    res.render("about");
  },
  notFoundController: (req, res) => {
    res.render("404");
  },
};
