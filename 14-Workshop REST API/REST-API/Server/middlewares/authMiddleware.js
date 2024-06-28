const jwt = require("jsonwebtoken");

exports.authMiddleware = () => async (req, res, next) => {
  const token = req.headers["X-Authorization"];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, "mybig123123123SECRET");

    req.user = decodedToken;

    next();
  } catch (err) {
    res.redirect("/login");
  }
};

exports.isAuth = () => async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
};

exports.isGuest = () => async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }

  next();
};

