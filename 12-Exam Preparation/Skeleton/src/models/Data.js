const mongoose = require("mongoose");


//TODO replace with dataa model from exam description

const dataSchema = new mongoose.Schema({
    prop: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = { Data };