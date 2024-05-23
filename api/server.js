import express from "express";
import fs from "fs";
import { ApolloServer, UserInputError } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
import { MongoClient } from "mongodb";

const dbName = "bugbuddy";
const url = `mongodb://127.0.0.1/${dbName}`;
const issuesCollection = "issues";
const countersCollection = "counters";
let db;

const app = express();
const PORT = 3000;

let aboutMessage = "Issue Tracker API v1.0";

async function connectToDb() {
  const client = new MongoClient(url);
  await client.connect(dbName);
  console.log("Connected to MongoDB", url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db
    .collection(countersCollection)
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnDocument: "after" }
    );
  return result.current;
}

async function issueList() {
  const issues = await db.collection(issuesCollection).find({}).toArray();
  console.log("Issues from DB: ", issues);
  return issues;
}

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

function validateIssue(_, { issue }) {
  const errors = [];

  if (issue.title.length < 3) {
    errors.push("Field `Title` must be at least 3 characters long.");
  }

  if (issue.status === "Assigned" && !issue.owner) {
    errors.push("Field `Owner` is required when status is `Assigned`");
  }

  if (errors.length > 0) {
    errors.map((err) => console.log(err, "\n"));
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

async function issueAdd(_, { issue }) {
  validateIssue(_, { issue });
  issue.created = new Date();
  issue.id = await getNextSequence("issues");
  console.log("This issue id is: ", issue.id);
  if (!issue.effort) issue.effort = Math.floor(Math.random() * 10) + 1;
  const result = await db.collection(issuesCollection).insertOne(issue);
  const savedIssue = await db
    .collection(issuesCollection)
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.applyMiddleware({ app, path: "/graphql" });

(async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`API server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
})();
