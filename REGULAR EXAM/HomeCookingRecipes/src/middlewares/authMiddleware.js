const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.authMiddleware = () => async (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = await jwt.verify(token, SECRET);

    req.user = decodedToken;
    res.locals.isAthenticated = true;
    res.locals.user = decodedToken;

    next();
  } catch (err) {
    res.clearCookie("auth");
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

