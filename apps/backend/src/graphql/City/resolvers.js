const City = {
  Query: {
    findUniqueCity: (_parent, args, { prisma }) => {
      return prisma.city.findUnique(args)
    },
    findFirstCity: (_parent, args, { prisma }) => {
      return prisma.city.findFirst(args)
    },
    findManyCity: (_parent, args, { prisma }) => {
      return prisma.city.findMany(args)
    },
    findManyCityCount: (_parent, args, { prisma }) => {
      return prisma.city.count(args)
    },
    aggregateCity: (_parent, args, { prisma }) => {
      return prisma.city.aggregate(args)
    },
  },
  Mutation: {
    createOneCity: (_parent, args, { prisma }) => {
      return prisma.city.create(args)
    },
    updateOneCity: (_parent, args, { prisma }) => {
      return prisma.city.update(args)
    },
    deleteOneCity: async (_parent, args, { prisma }) => {
      return prisma.city.delete(args)
    },
    upsertOneCity: async (_parent, args, { prisma }) => {
      return prisma.city.upsert(args)
    },
    deleteManyCity: async (_parent, args, { prisma }) => {
      return prisma.city.deleteMany(args)
    },
    updateManyCity: (_parent, args, { prisma }) => {
      return prisma.city.updateMany(args)
    },
  },
}

module.exports = {
  City,
}
