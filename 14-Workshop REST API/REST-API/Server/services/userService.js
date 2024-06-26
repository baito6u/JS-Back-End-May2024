const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.register = async (userData) => {
  //   if (userData.password !== userData.rePass) {
  //     throw new Error("Password don't match!");
  //   }

  const user = await User.create(userData);

  return generateaccessToken(user);
};

exports.login = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error("Email or password don't mach!");
  }

  const isValid = bcrypt.compare(userData.password, user.password);

  if (!isValid) {
    throw new Error("Email or password don't mach!");
  }

  return generateaccessToken(user);
};

function generateaccessToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const SECRET = "DQWDKIJ3DJIASKSDLjo3ijf23jrj29";

  const accessToken = jwt.sign(payload, SECRET);

  return {
    _id: user._id,
    email: user.email,
    accessToken,
  };
}
