const { Generator } = require('@paljs/generator');

// findUnique | findFirst | findMany | findCount | aggregate | createOne | updateOne | upsertOne | deleteOne | updateMany | deleteMany
// const excludeQueriesAndMutations = ['aggregate', 'upsertOne', 'updateMany', 'deleteMany', 'findFirst']
const excludeQueriesAndMutations = []
new Generator(
  {
    name: 'sdl',
    schemaPath: './prisma/schema.prisma'
  },
  {
    javaScript: true,
    excludeQueriesAndMutations,
  }
).run()