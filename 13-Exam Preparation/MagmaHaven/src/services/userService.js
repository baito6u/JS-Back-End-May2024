const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const identityName = "email";

async function register(identity, username, password) {
  const existingUser = await User.findOne({ [identityName]: identity });

  if (existingUser) {
    throw new Error(`This ${identityName} alredy in use!`);
  }

  const user = new User({
    [identityName]: identity,
    username,
    password: await bcrypt.hash(password, 10),
  });

  try {
    await user.save();
  } catch (err) {
    if (err.code == 1100) {
      throw new Error("This username is already in use!");
    }
  }

  return user;
}
async function login(identity, password) {
  const user = await User.findOne({ [identityName]: identity });
  if (!user) {
    throw new Error(`Incorrect ${identityName} or pasword!`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error(`Incorrect ${identityName} or pasword!`);
  }

  return user;
}

module.exports = {
  register,
  login,
};
