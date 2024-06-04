import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const countersCollection = 'counters';
let db;

async function connectToDb() {
  const dbName = process.env.DBNAME;
  const url = process.env.DB_URL || `mongodb://127.0.0.1/${dbName}`;
  const client = new MongoClient(url);
  await client.connect(dbName);
  console.log('Connected to MongoDB', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db
    .collection(countersCollection)
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnDocument: 'after' },
    );
  return result.current;
}

function getDB() {
  return db;
}

export { connectToDb, getNextSequence, getDB };
