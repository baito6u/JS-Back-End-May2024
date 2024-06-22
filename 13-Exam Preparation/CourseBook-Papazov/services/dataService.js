const Data = require("../models/Data");
const User = require("../models/User");

exports.createData = async (userId, data) => {
  const createdData = await Data.create({
    owner: userId,
    ...data,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { createdData: createdData._id },
  });

  return createdData;
};

exports.getAll = () => Data.find();

exports.getOne = (dataId) => Data.findById(dataId);

exports.getOneDetailed = (dataId) => this.getOne(dataId).populate("owner");

