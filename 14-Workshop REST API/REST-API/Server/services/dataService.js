const Data = require("../models/Data");

exports.getAll = () => Data.find();

exports.create = (data) => Data.findOne();