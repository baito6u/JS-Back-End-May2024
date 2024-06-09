const bcrypt = require("bcrypt");

const { User } = require("../models/User");

async function register(email, password) {
  // chek if user exist -> throw errror if true
  const existingUser = await User.findOne({ email });

    if (existingUser) {
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

async function login(email, password) {
    // chek if user exist -> throw errror if true
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }
    //compare hashed password -> throw error if false

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect email or password");
    }
    //return matched user
    return user;
}


module.exports = {
  register,
  login,
};
