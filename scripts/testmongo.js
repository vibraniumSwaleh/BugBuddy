import { MongoClient } from "mongodb";

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
const dbName = "bugbuddy";
const dbCollection = "issues"
const url = `mongodb://127.0.0.1/${dbName}:27017`;
const issuesdb = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2019-01-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2019-01-16"),
    due: new Date("2019-02-01"),
    title: "Missing bottom border on panel",
  },
];

async function testWithAsync() {
  console.log("\n--- testWithAsync ---", "\n");
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB", "\n");
    const db = client.db(dbName);
    console.log(`Currently using database: ${db.databaseName}`, "\n");

    const collection = db.collection(dbCollection);
    const result = await collection.insertMany(issuesdb);
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
