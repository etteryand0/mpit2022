const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    createOneEntepreneur: async (_parent, args, { prisma, salt }) => {
      let { data } = args
      data.email = data.email.toLowerCase();
      const isValidEmail = emailRegex.test(data.email);

      if (!isValidEmail)
        throw new Error('Invalid email');
      if (data.password.length < 8)
        throw new Error('Too short password');

      if (await prisma.entepreneur.findUnique({ where: { email: data.email } })) {
        throw new Error("Entepreneur already exists")
      }

      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;

      const select = args.select.entepreneur
      const entepreneur = await prisma.entepreneur.create({ data, ...select });

      const token = await jwt.sign({
        id: entepreneur.id,
      }, process.env.JWT_SECRET);

      return { token, entepreneur };
    },
    logInEntepreneur: async (_parent, { data, select }, { prisma }) => {
      select = select.entepreneur
      const { email, password } = data
      select.select.password = true
      const isValidEmail = emailRegex.test(data.email);

      if (!isValidEmail)
        throw new Error('Invalid email');
      
      const entepreneur = await prisma.entepreneur.findUnique({ where: { email }, ...select })

      if (!entepreneur)
        throw new Error('Entepreneur doesn\'t exist')
      
      const areEqual = bcrypt.compare(password, entepreneur.password)

      if (!areEqual)
        throw new Error('Wrong credentials')

      const token = await jwt.sign({
        id: entepreneur.id,
      }, process.env.JWT_SECRET);

      return { entepreneur, token }
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
