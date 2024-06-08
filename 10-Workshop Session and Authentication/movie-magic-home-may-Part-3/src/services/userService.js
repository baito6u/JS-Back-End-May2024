const bcrypt = require("bcrypt");

const { User } = require("../models/User");

async function register(email, password) {
  // chek if user exist -> throw errror if true
  const existinUser = await User.findOne({ email });

  if (existinUser) {
    throw new Error("Email is already used");
  }

  // create DB record
  //hash password
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();

  //return saved record
  return user;
}

async function login(email, password) {}

async function logout() {}

module.exports = {
  register,
  login,
  logout,
};
