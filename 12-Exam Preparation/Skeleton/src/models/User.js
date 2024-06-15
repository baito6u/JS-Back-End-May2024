const mongoose = require("mongoose");

//TODO replace with User model from exam description

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };