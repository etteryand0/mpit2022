const { default: gql } = require('graphql-tag')

const Donation = gql`
  type Donation {
    id: String!
    createdAt: DateTime!
    amount: Int!
    donor: User!
    donorId: String!
    crowdfunding: Crowdfunding!
    crowdfundingId: String!
  }

  type Query {
    findUniqueDonation(where: DonationWhereUniqueInput!): Donation
    findFirstDonation(
      where: DonationWhereInput
      orderBy: [DonationOrderByWithRelationInput]
      cursor: DonationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [DonationScalarFieldEnum]
    ): Donation
    findManyDonation(
      where: DonationWhereInput
      orderBy: [DonationOrderByWithRelationInput]
      cursor: DonationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [DonationScalarFieldEnum]
    ): [Donation!]
    findManyDonationCount(
      where: DonationWhereInput
      orderBy: [DonationOrderByWithRelationInput]
      cursor: DonationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [DonationScalarFieldEnum]
    ): Int!
    aggregateDonation(
      where: DonationWhereInput
      orderBy: [DonationOrderByWithRelationInput]
      cursor: DonationWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateDonation
  }

  type Mutation {
    createOneDonation(data: DonationCreateInput!): Donation!
    updateOneDonation(
      data: DonationUpdateInput!
      where: DonationWhereUniqueInput!
    ): Donation!
    deleteOneDonation(where: DonationWhereUniqueInput!): Donation
    upsertOneDonation(
      where: DonationWhereUniqueInput!
      create: DonationCreateInput!
      update: DonationUpdateInput!
    ): Donation
    deleteManyDonation(where: DonationWhereInput): BatchPayload
    updateManyDonation(
      data: DonationUpdateManyMutationInput!
      where: DonationWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Donation,
}
