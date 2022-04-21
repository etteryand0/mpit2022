const { default: gql } = require('graphql-tag')

const Entepreneur = gql`
  type Entepreneur {
    id: String!
    email: String!
    password: String!
    name: String!
    bio: String!
    avatar: String!
    products(
      where: ProductWhereInput
      orderBy: ProductOrderByWithRelationInput
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: ProductScalarFieldEnum
    ): [Product!]!
    crowdfunding: Crowdfunding
    createdAt: DateTime!
    city: City!
    cityId: String!
    _count: EntepreneurCountOutputType!
  }

  type Query {
    findUniqueEntepreneur(where: EntepreneurWhereUniqueInput!): Entepreneur
    findFirstEntepreneur(
      where: EntepreneurWhereInput
      orderBy: [EntepreneurOrderByWithRelationInput]
      cursor: EntepreneurWhereUniqueInput
      take: Int
      skip: Int
      distinct: [EntepreneurScalarFieldEnum]
    ): Entepreneur
    findManyEntepreneur(
      where: EntepreneurWhereInput
      orderBy: [EntepreneurOrderByWithRelationInput]
      cursor: EntepreneurWhereUniqueInput
      take: Int
      skip: Int
      distinct: [EntepreneurScalarFieldEnum]
    ): [Entepreneur!]
    findManyEntepreneurCount(
      where: EntepreneurWhereInput
      orderBy: [EntepreneurOrderByWithRelationInput]
      cursor: EntepreneurWhereUniqueInput
      take: Int
      skip: Int
      distinct: [EntepreneurScalarFieldEnum]
    ): Int!
    aggregateEntepreneur(
      where: EntepreneurWhereInput
      orderBy: [EntepreneurOrderByWithRelationInput]
      cursor: EntepreneurWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateEntepreneur
  }

  type Mutation {
    createOneEntepreneur(data: EntepreneurCreateInput!): EntepreneurCreateOutput!
    logInEntepreneur(data: LogInInput): EntepreneurCreateOutput!
    updateOneEntepreneur(
      data: EntepreneurUpdateInput!
      where: EntepreneurWhereUniqueInput!
    ): Entepreneur!
    deleteOneEntepreneur(where: EntepreneurWhereUniqueInput!): Entepreneur
    upsertOneEntepreneur(
      where: EntepreneurWhereUniqueInput!
      create: EntepreneurCreateInput!
      update: EntepreneurUpdateInput!
    ): Entepreneur
    deleteManyEntepreneur(where: EntepreneurWhereInput): BatchPayload
    updateManyEntepreneur(
      data: EntepreneurUpdateManyMutationInput!
      where: EntepreneurWhereInput
    ): BatchPayload
  }

  input LogInInput {
    email: String!
    password: String!
  }
  type EntepreneurCreateOutput {
    token: String!
    entepreneur: Entepreneur!
  }
`

module.exports = {
  Entepreneur,
}
