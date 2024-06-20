const { Data } = require("../models/Data");

async function getAll() {
  return Data.find().lean();
}

async function getById(id) {
  return Data.findById(id).lean();
}

async function create(data, authorId) {
  //TODO extract properties from Data model

  const record = new Data({
    name: data.name,
    location: data.location,
    elevation: data.elevation,
    lastEruption: data.lastEruption,
    image: data.image,
    typeVolcano: data.typeVolcano,
    description: data.description,
    author: authorId,
  });

  await record.save();

  return record;
}

async function update(id, data, userId) {
  const record = await Data.findById(id);

  if (!record) {
    throw new ReferenceError("Record not found!" + id);
  }

  if (record.author.toString() != userId) {
    throw new Error("Access denied!");
  }

  record.name = data.name;
  record.location = data.location;
  record.elevation = data.elevation;
  record.lastEruption = data.lastEruption;
  record.image = data.image;
  record.typeVolcano = data.typeVolcano;
  record.description = data.description;
  record.author = authorId;

  await record.save();

  return record;
}

//TODO add voting method

async function deleteById(id, userId) {
  const record = await Data.findById(id);

  if (!record) {
    throw new ReferenceError("Record not found!" + id);
  }

  if (record.author.toString() != userId) {
    throw new Error("Access denied!");
  }

  await Data.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
