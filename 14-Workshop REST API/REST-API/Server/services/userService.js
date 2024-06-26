const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (userData) => {
  //   if (userData.password !== userData.rePass) {
  //     throw new Error("Password don't match!");
  //   }

  const user = await User.create(userData);

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const SECRET = "DQWDKIJ3DJIASKSDLjo3ijf23jrj29"

  const token = jwt.sign(payload, SECRET);

  return {
    _id: user._id,
    email: user.email,
    token: token,
  };
};
