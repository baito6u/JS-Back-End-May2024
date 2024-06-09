const { verifyToken } = require("../services/tokenService");

function session() {
  return function (req, res, next) {
    const token = req.cookies.token;

    if (token) {
      try {
        const payload = verifyToken(token);
        req.user = payload;
      } catch (error) {
        res.clearCookie("token");
      }
    }

    next();
  };
}

module.exports = {
  session,
};
