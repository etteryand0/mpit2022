const { default: gql } = require('graphql-tag')

const City = gql`
  type City {
    id: String!
    name: String!
    users(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    entepreneurs(
      where: EntepreneurWhereInput
      orderBy: EntepreneurOrderByWithRelationInput
      cursor: EntepreneurWhereUniqueInput
      take: Int
      skip: Int
      distinct: EntepreneurScalarFieldEnum
    ): [Entepreneur!]!
    _count: CityCountOutputType!
  }

  type Query {
    findUniqueCity(where: CityWhereUniqueInput!): City
    findFirstCity(
      where: CityWhereInput
      orderBy: [CityOrderByWithRelationInput]
      cursor: CityWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CityScalarFieldEnum]
    ): City
    findManyCity(
      where: CityWhereInput
      orderBy: [CityOrderByWithRelationInput]
      cursor: CityWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CityScalarFieldEnum]
    ): [City!]
    findManyCityCount(
      where: CityWhereInput
      orderBy: [CityOrderByWithRelationInput]
      cursor: CityWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CityScalarFieldEnum]
    ): Int!
    aggregateCity(
      where: CityWhereInput
      orderBy: [CityOrderByWithRelationInput]
      cursor: CityWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateCity
  }

  type Mutation {
    createOneCity(data: CityCreateInput!): City!
    updateOneCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City!
    deleteOneCity(where: CityWhereUniqueInput!): City
    upsertOneCity(
      where: CityWhereUniqueInput!
      create: CityCreateInput!
      update: CityUpdateInput!
    ): City
    deleteManyCity(where: CityWhereInput): BatchPayload
    updateManyCity(
      data: CityUpdateManyMutationInput!
      where: CityWhereInput
    ): BatchPayload
  }
`

module.exports = {
  City,
}
