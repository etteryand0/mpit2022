const { Crowdfunding } = require('./Crowdfunding/resolvers')
const { Product } = require('./Product/resolvers')
const { Entepreneur } = require('./Entepreneur/resolvers')
const { User } = require('./User/resolvers')

const resolvers = [User, Entepreneur, Product, Crowdfunding]

module.exports = { resolvers }
