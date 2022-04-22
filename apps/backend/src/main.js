require('dotenv').config();
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app)

const {
  graphqlUploadExpress,
} = require('graphql-upload');

app.use(express.json());

app.use(graphqlUploadExpress())

const ASSETS_PATH = require('path').join(__dirname, 'assets')

module.exports = {
  ASSETS_PATH
}

const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { applyMiddleware } = require('graphql-middleware')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const jwt = require('jsonwebtoken');

const { prismaSelectMiddleware } = require('./middlewares')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const middlewares = [prismaSelectMiddleware]

const schemaWithMiddleware = applyMiddleware(schema, ...middlewares)

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req }) => {
    const authorization = req.headers;

    const salt = 10;
    return {
      prisma,
      salt,
      tokenError: new Error("Invalid token"),
      permissionError: new Error("Permission denied"),
      checkToken: async () => {
        const SECRET = process.env.JWT_SECRET;

        const decoded = jwt.decode(authorization, SECRET, (err, decoded) => {
          if (err)
            return null;
          return decoded;
        });
        return decoded;
      },
    }
  }
});

const startServer = async (server) => {
  await server.start()
  server.applyMiddleware({ app, path: '/' })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer(server)