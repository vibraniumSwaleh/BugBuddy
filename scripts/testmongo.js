import { MongoClient } from "mongodb";

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
const dbName = "bugbuddy";
const url = `mongodb://127.0.0.1/${dbName}:27017`;
let db;

async function connectToDb() {
  const client = new MongoClient({ url });
  await client.connect(dbName);
  console.log("Connected to MonogoDB", url);
  db = client.db();
}

async function testWithAsync() {
  console.log("\n--- testWithAsync ---", "\n");
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB", "\n");
    const db = client.db(dbName);
    console.log(`Currently using database: ${db.databaseName}`, "\n");

    const collection = db.collection("employees");
    const employee = {
      id: 2,
      name: { first: "Mani", last: "Garry" },
      age: 25,
    };
    const result = await collection.insertOne(employee);
    console.log("Result of insert:\n", result, "\n");

    const docs = await collection.find().toArray();
    console.log("Result of find:\n", docs, "\n");
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

testWithAsync();
