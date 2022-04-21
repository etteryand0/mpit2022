const { Crowdfunding } = require('./Crowdfunding/typeDefs')
const { Product } = require('./Product/typeDefs')
const { Entepreneur } = require('./Entepreneur/typeDefs')
const { User } = require('./User/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([
  sdlInputs(),
  User,
  Entepreneur,
  Product,
  Crowdfunding,
])

module.exports = { typeDefs }
