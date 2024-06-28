const Data = require("../models/Data");

exports.getAll = () => Data.find();

exports.getOne = (dataId) => Data.findById(dataId);

exports.create = (data) => Data.create(data);

exports.edit = (dataId, data) => Data.findByIdAndUpdate(dataId, data);

exports.deleteData = (dataId) => Data.findByIdAndDelete(dataId);