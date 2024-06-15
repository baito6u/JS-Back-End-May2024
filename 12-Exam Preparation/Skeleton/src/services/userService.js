const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const identityName = "email"; //TODO change "email" baased on exm description

async function register(identity, password) {
    const existingUser = await User.findOne({ [identityName]: identity });

    if (existingUser) {
        throw new Error(`This ${identityName} alredy in use!`)
    }

    const user = new User({
        [identityName]: identity,
        password: await bcrypt.hash(password, 10);
    });

    await user.save();

    return user;
}
async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity});
    if(!user) {
        throw new Error('Incorrect uername or pasword!');
    }
    
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw new Error('Incorrect uername or pasword!');
    }

    return user;
}



module.exports = {
    register,
    login,
}