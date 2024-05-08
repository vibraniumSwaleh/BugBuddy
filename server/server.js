import express from "express";
import fs from "fs";
import { ApolloServer } from "apollo-server-express";

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

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}
function issueList() {
  return issuesDB;
}

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
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
