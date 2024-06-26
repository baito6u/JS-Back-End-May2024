const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const User = require("../models/User");
const {SECRET} = require("../config/config");

exports.register = async (userData) => {
  if (userData.password !== userData.repass) {
    throw new Error("Password don't mach!");
  }

  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new Error("User already exist!");
  }

  const createdUser = await User.create(userData);

  const token = await generateToken(createdUser);

  return token;

};

exports.login = async ({email, password}) => {
  //get user from DB
  const user = await User.findOne({email});

  if (!user) {
    throw new Error("Email or password is invalid!");
  }
  //chek password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email or password is invalid");
  }
  
  const token = await generateToken(user);

  return token;
};

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, SECRET, { expiresIn: "2h" });

}
