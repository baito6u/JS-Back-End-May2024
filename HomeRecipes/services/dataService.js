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

exports.getRecent = () => Data.find().sort({ $natural: -1 }).limit(3);

exports.getAll = () => Data.find();

exports.getOne = (dataId) => Data.findById(dataId);

exports.getOneDetailed = (dataId) =>
  this.getOne(dataId).populate("owner").populate("recommendList");

exports.signUp = async (dataId, userId) => {
  await Data.findByIdAndUpdate(dataId, { $push: { recommendList: userId } });
  await User.findByIdAndUpdate(userId, { $push: { signedUpData: dataId } });
};

exports.deleteData = (dataId) => Data.findByIdAndDelete(dataId);

exports.edit = (dataId, data) => Data.findByIdAndUpdate(dataId, data, {runValidators: true});
