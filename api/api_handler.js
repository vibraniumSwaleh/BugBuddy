import fs from 'fs';
import { ApolloServer } from 'apollo-server-express';
import GraphQLDate from './graphql_date.js';
import about from './about.js';
import issue from './issue.js';
import dotenv from 'dotenv';

dotenv.config();

const resolvers = {
  Query: {
    about: about.getMessage,
    issueList: issue.list,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    issueAdd: issue.add,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

export default installHandler;
