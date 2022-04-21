const express = require('express');
const app = express();
const PORT = process.env.PORT_EXPRESS || 8001;

app.use(express.json());

app.listen(PORT, () => {
  console.log('Express server is running at port ' + PORT)
});

const { ApolloServer } = require('apollo-server');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const jwt = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req.headers;

    const salt = 10;
    return {
      prisma,
      salt,
      tokenError: new Error("Invalid token"),
      permissionError: new Error("Permission denied"),
      checkToken: async () => {
        const SECRET = process.env.AUTH_TOKEN;

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

require('dotenv').config();

server.listen().then(({ url }) => {
  console.log(`Server up & running at ${url}`)
})