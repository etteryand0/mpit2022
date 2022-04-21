const { default: gql } = require('graphql-tag')

const Product = gql`
  type Product {
    id: String!
    owner_id: String!
    owner: Entepreneur!
    purchasers(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    title: String!
    category(
      where: CategoryWhereInput
      orderBy: CategoryOrderByWithRelationInput
      cursor: CategoryWhereUniqueInput
      take: Int
      skip: Int
      distinct: CategoryScalarFieldEnum
    ): [Category!]!
    description: String!
    composition: String!
    image: String!
    price: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    _count: ProductCountOutputType!
  }

  type Query {
    findUniqueProduct(where: ProductWhereUniqueInput!): Product
    findFirstProduct(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): Product
    findManyProduct(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): [Product!]
    findManyProductCount(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): Int!
    aggregateProduct(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateProduct
  }

  type Mutation {
    createOneProduct(data: ProductCreateInput!): Product!
    updateOneProduct(
      data: ProductUpdateInput!
      where: ProductWhereUniqueInput!
    ): Product!
    deleteOneProduct(where: ProductWhereUniqueInput!): Product
    upsertOneProduct(
      where: ProductWhereUniqueInput!
      create: ProductCreateInput!
      update: ProductUpdateInput!
    ): Product
    deleteManyProduct(where: ProductWhereInput): BatchPayload
    updateManyProduct(
      data: ProductUpdateManyMutationInput!
      where: ProductWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Product,
}
