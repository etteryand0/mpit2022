const Entepreneur = {
  Query: {
    findUniqueEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.findUnique(args)
    },
    findFirstEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.findFirst(args)
    },
    findManyEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.findMany(args)
    },
    findManyEntepreneurCount: (_parent, args, { prisma }) => {
      return prisma.entepreneur.count(args)
    },
    aggregateEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.aggregate(args)
    },
  },
  Mutation: {
    createOneEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.create(args)
    },
    updateOneEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.update(args)
    },
    deleteOneEntepreneur: async (_parent, args, { prisma }) => {
      return prisma.entepreneur.delete(args)
    },
    upsertOneEntepreneur: async (_parent, args, { prisma }) => {
      return prisma.entepreneur.upsert(args)
    },
    deleteManyEntepreneur: async (_parent, args, { prisma }) => {
      return prisma.entepreneur.deleteMany(args)
    },
    updateManyEntepreneur: (_parent, args, { prisma }) => {
      return prisma.entepreneur.updateMany(args)
    },
  },
}

module.exports = {
  Entepreneur,
}
