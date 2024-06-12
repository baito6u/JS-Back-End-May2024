const { register, login } = require("../services/userService");
const { createToken } = require("../services/tokenService");

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
      const token = createToken(user);

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    } catch (err) {
      res.render("register", { data: { email }, error: err.message });
      return;
    }
  },

  loginGetController: (req, res) => {
    res.render("login");
  },

  loginPostController: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new Error("All fields are required!");
      }

      const user = await login(email, password);
      const token = createToken(user);

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    } catch (err) {
      res.render("login", { data: { email }, error: err.message });
      return;
    }
  },
  logoutController: (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
  },
};