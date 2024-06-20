const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  elevation: {
    type: Number,
    required: true,
  },
  lastEruption: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  typeVolcano: {
    type: String,
    enum: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  voteList: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

dataSchema.virtual("votes").get(function(){
  return this.voteList.length;
});

const Data = mongoose.model("Data", dataSchema);

module.exports = { Data };
