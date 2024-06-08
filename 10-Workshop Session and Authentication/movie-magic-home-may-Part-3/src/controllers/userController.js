const { register } = require("../services/userService");

module.exports = {
  registerGetController: (req, res) => {
    res.render("register");
  },
  registerPostController: async (req, res) => {
    const { email, password, repass } = req.body;

    try {
      if (!email || !password) {
        throw new Error("All fields are required!");
      }
      if (password != repass) {
        throw new Error("Passwords do not match");
      }

      const user = await register(email, password);
      res.redirect("/");

    } catch (err) {
      res.render("register", { data: { email }, error: err.message });
      return;
    }
  },
};
