import express from "express";
import fs from "fs";
import { ApolloServer } from "apollo-server-express";

let aboutMessage = "Issue Tracker API v1.0";

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
const server = new ApolloServer({
  typeDefs: fs.readFileSync("./api/schema.graphql", "utf-8"),
  resolvers,
});

app.use("/", pagesServer);
server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("Hellow World!");
});
