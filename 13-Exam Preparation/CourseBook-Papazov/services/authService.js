const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.register = async (userData) => {
  if (userData.password !== userData.repass) {
    throw new Error("Password don't mach");
  }

  const user = await User.find({ email: userData.email });
  if (user) {
    throw new Error("User already exist!");
  }

  return User.create(userData);
};

exports.login = async (email, password) => {
  //get user from DB
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or password is invalid");
  }
  //chek password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email or password is invalid");
  }
  //generate token

  //return
};
