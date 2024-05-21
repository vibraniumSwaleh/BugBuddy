import express from "express";
import fs from "fs";
import { ApolloServer, UserInputError } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
import { MongoClient } from "mongodb";

const dbName = "bugbuddy";
const url = `mongodb://127.0.0.1/${dbName}:27017`;
let db;

const app = express();
const PORT = 4000;
const pagesServer = express.static("public");

let aboutMessage = "Issue Tracker API v1.0";
const issuesDB = [
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

async function connectToDb() {
  const client = new MongoClient(url);
  await client.connect(dbName);
  console.log("Connected to MongoDB", url);
  db = client.db();
}

function issueList() {
  return issuesDB;
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
    throw new UserInputError("Invalid input(s)", { errors });
  }
}
function issueAdd(_, { issue }) {
  validateIssue(_, { issue });
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  if (!issue.effort) issue.effort = Math.floor(Math.random() * 10) + 1;
  issuesDB.push(issue);
  return issue;
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
  typeDefs: fs.readFileSync("./api/schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

app.use("/", pagesServer);
server.applyMiddleware({ app, path: "/graphql" });

(async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
})();

app.get("/hello", (req, res) => {
  res.send("Hellow World!");
});
