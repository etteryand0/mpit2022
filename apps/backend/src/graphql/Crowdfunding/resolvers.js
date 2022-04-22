const Crowdfunding = {
  Query: {
    findUniqueCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.findUnique(args)
    },
    findFirstCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.findFirst(args)
    },
    findManyCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.findMany(args)
    },
    findManyCrowdfundingCount: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.count(args)
    },
    aggregateCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.aggregate(args)
    },
  },
  Mutation: {
    createOneCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.create(args)
    },
    updateOneCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.update(args)
    },
    deleteOneCrowdfunding: async (_parent, args, { prisma }) => {
      return prisma.crowdfunding.delete(args)
    },
    upsertOneCrowdfunding: async (_parent, args, { prisma }) => {
      return prisma.crowdfunding.upsert(args)
    },
    deleteManyCrowdfunding: async (_parent, args, { prisma }) => {
      return prisma.crowdfunding.deleteMany(args)
    },
    updateManyCrowdfunding: (_parent, args, { prisma }) => {
      return prisma.crowdfunding.updateMany(args)
    },
  },
}

module.exports = {
  Crowdfunding,
}
