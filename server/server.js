import express, { query } from "express";
import { ApolloServer } from "apollo-server-express";

const app = express();
const PORT = 4000;
const pagesServer = express.static("public");

let aboutMessage = "Issue Tracker API v1.0";

const typeDefs = `
type Query {
  about: String!
}
type Mutation {
  setAboutMessage(message: String!): String
}`;

const resolver = {
  Query: {
    about: () => aboutMessage,
  },
  Mutation: {},
};

app.use("/", pagesServer);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("Hellow World!");
});
