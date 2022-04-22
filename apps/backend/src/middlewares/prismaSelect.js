const { PrismaSelect } = require('@paljs/plugins')

const prismaSelectMiddleware = async (resolve, root, args, context, info) => {
  const select = new PrismaSelect(info).value
  return await resolve(root, { ...args, ...select}, context, info)
}

module.exports = prismaSelectMiddleware