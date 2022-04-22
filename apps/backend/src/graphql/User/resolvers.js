const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const User = {
  Query: {
    findUniqueUser: (_parent, args, { prisma }) => {
      return prisma.user.findUnique(args)
    },
    findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args)
    },
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args)
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args)
    },
    aggregateUser: (_parent, args, { prisma }) => {
      return prisma.user.aggregate(args)
    },
  },
  Mutation: {
    createOneUser: async (_parent, args, { prisma, salt }) => {
      let { data } = args
      data.email = data.email.toLowerCase();
      const isValidEmail = emailRegex.test(data.email);

      if (!isValidEmail)
        throw new Error('Invalid email');
      if (data.password.length < 8)
        throw new Error('Too short password');

      if (await prisma.user.findUnique({ where: { email: data.email }})) {
        throw new Error("User already exists")
      } 

      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;

      const select = args.select.user
      const user = await prisma.user.create({ data, ...select });

      const token = await jwt.sign({
        id: user.id,
      }, process.env.JWT_SECRET);

      return { token, user };
    },
    logInUser: async (_parent, { data, select }, { prisma }) => {
      select = select.user
      const { email, password } = data
      select.select.password = true
      const isValidEmail = emailRegex.test(data.email);

      if (!isValidEmail)
        throw new Error('Invalid email');
      
      const user = await prisma.user.findUnique({ where: { email }, ...select })

      if (!user)
        throw new Error('Entepreneur doesn\'t exist')
      
      const areEqual = bcrypt.compare(password, user.password)

      if (!areEqual)
        throw new Error('Wrong credentials')

      const token = await jwt.sign({
        id: user.id,
      }, process.env.JWT_SECRET);

      return { user, token }
    },
    updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args)
    },
    deleteOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.delete(args)
    },
    upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args)
    },
    deleteManyUser: async (_parent, args, { prisma }) => {
      return prisma.user.deleteMany(args)
    },
    updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args)
    },
  },
}

module.exports = {
  User,
}
