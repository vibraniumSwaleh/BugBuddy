import express from "express";
import { ApolloServer } from "apollo-server-express";

let aboutMessage = "Issue Tracker API v1.0";

const typeDefs = `
type Query {
  about: String!
}
type Mutation {
  setAboutMessage(message: String!): String
}`;

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

const resolvers = {
  Query: {
    about: () => aboutMessage,
  },
  Mutation: {
    setAboutMessage,
  },
};

const app = express();
const PORT = 4000;
const pagesServer = express.static("public");
const server = new ApolloServer({ typeDefs, resolvers });

app.use("/", pagesServer);
server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("Hellow World!");
});
