require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT_EXPRESS || 8001;

app.use(express.json());

app.listen(PORT, () => {
  console.log('Express server is running at port ' + PORT)
});

const { ApolloServer, makeExecutableSchema } = require('apollo-server');
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

server.listen().then(({ url }) => {
  console.log(`Server up & running at ${url}`)
})