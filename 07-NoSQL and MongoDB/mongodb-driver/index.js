const { MongoClient } = require("mongodb");

const connectionString = `mongodb://localhost:27017`;
const client = new MongoClient(connectionString);

async function run() {
  const database = client.db("test");
  const collection = database.collection("students");

  const studentsCursor = await collection.find({ name: "Pesho" });
  const students = await studentsCursor.toArray();

  console.log(students);
}

run();
