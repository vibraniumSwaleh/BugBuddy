import MongoClient from "mongodb";

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
const url = "mongodb://192.168.233.168/bugbuddy:27017";

const client = MongoClient(url, { useNewUrlParser: true });
client.connect((err, client) => {
  const db = client.db();
  const collection = db.collection("employees");
  const employee = { id: 1, name: "A. Callback", age: 23 };
  
  collection.insertOne(employee, (err, result) => {
    console.log("Result of insert:\n", result.insertedId);
  });
});
