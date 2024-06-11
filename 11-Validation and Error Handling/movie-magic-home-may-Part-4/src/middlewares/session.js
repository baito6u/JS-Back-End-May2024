const { verifyToken } = require("../services/tokenService");

function session() {
  return function (req, res, next) {
    const token = req.cookies.token;

    if (token) {
      try {
        const payload = verifyToken(token);
        req.user = payload;

        //injecting hasUser in handlebars
        res.locals.hasUser = true;
        
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
