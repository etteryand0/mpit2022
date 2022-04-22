const { Crowdfunding } = require('./Crowdfunding/resolvers')
const { Donation } = require('./Donation/resolvers')
const { City } = require('./City/resolvers')
const { Category } = require('./Category/resolvers')
const { Product } = require('./Product/resolvers')
const { Entepreneur } = require('./Entepreneur/resolvers')
const { User } = require('./User/resolvers')
const { Upload } = require("./Upload/resolvers")

const resolvers = [
  Upload,
  User,
  Entepreneur,
  Product,
  Category,
  City,
  Donation,
  Crowdfunding,
]

module.exports = { resolvers }
