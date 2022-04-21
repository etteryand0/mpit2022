const { default: gql } = require('graphql-tag')

const Crowdfunding = gql`
  type Crowdfunding {
    id: String!
    ownerId: String!
    owner: Entepreneur!
    goal: Int!
    earned: Int!
    donations(
      where: DonationWhereInput
      orderBy: DonationOrderByWithRelationInput
      cursor: DonationWhereUniqueInput
      take: Int
      skip: Int
      distinct: DonationScalarFieldEnum
    ): [Donation!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    _count: CrowdfundingCountOutputType!
  }

  type Query {
    findUniqueCrowdfunding(where: CrowdfundingWhereUniqueInput!): Crowdfunding
    findFirstCrowdfunding(
      where: CrowdfundingWhereInput
      orderBy: [CrowdfundingOrderByWithRelationInput]
      cursor: CrowdfundingWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CrowdfundingScalarFieldEnum]
    ): Crowdfunding
    findManyCrowdfunding(
      where: CrowdfundingWhereInput
      orderBy: [CrowdfundingOrderByWithRelationInput]
      cursor: CrowdfundingWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CrowdfundingScalarFieldEnum]
    ): [Crowdfunding!]
    findManyCrowdfundingCount(
      where: CrowdfundingWhereInput
      orderBy: [CrowdfundingOrderByWithRelationInput]
      cursor: CrowdfundingWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CrowdfundingScalarFieldEnum]
    ): Int!
    aggregateCrowdfunding(
      where: CrowdfundingWhereInput
      orderBy: [CrowdfundingOrderByWithRelationInput]
      cursor: CrowdfundingWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateCrowdfunding
  }

  type Mutation {
    createOneCrowdfunding(data: CrowdfundingCreateInput!): Crowdfunding!
    updateOneCrowdfunding(
      data: CrowdfundingUpdateInput!
      where: CrowdfundingWhereUniqueInput!
    ): Crowdfunding!
    deleteOneCrowdfunding(where: CrowdfundingWhereUniqueInput!): Crowdfunding
    upsertOneCrowdfunding(
      where: CrowdfundingWhereUniqueInput!
      create: CrowdfundingCreateInput!
      update: CrowdfundingUpdateInput!
    ): Crowdfunding
    deleteManyCrowdfunding(where: CrowdfundingWhereInput): BatchPayload
    updateManyCrowdfunding(
      data: CrowdfundingUpdateManyMutationInput!
      where: CrowdfundingWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Crowdfunding,
}
