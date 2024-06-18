const { Stone } = require("../models/Stone");

//TODO replace with real data service according exam description
async function getRecent() {
  return Stone.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getAll() {
  return Stone.find().lean();
}

async function getById(id) {
  return Stone.findById(id).lean();
}

async function create(data, authorId) {
  //TODO extract properties from Data model

  const record = new Stone({
    prop: data.prop,
    author: authorId,
  });

  await record.save();

  return record;
}

async function update(id, data, userId) {
  const record = await Stone.findById(id);

  if (!record) {
    throw new ReferenceError("Record not found!" + id);
  }

  if (record.author.toString() != userId) {
    throw new Error("Access denied!");
  }

  //TODO replace with real propperties
  record.prop = data.prop;

  await record.save();

  return record;
}

async function deleteById(id, userId) {
  const record = await Stone.findById(id);

  if (!record) {
    throw new ReferenceError("Record not found!" + id);
  }

  if (record.author.toString() != userId) {
    throw new Error("Access denied!");
  }

  await Stone.findByIdAndDelete(id);
}

module.exports = {
  getRecent,
  getAll,
  getById,
  create,
  update,
  deleteById,
};
