const { GraphQLUpload } = require('graphql-upload');
const fileUpload = require('./fileUpload')

const Upload = {
  FileUpload: GraphQLUpload,

  Mutation: {
    singleUpload: (_parent, { file }) => fileUpload(file),
    multiUpload: async (_parent, { files }) => {
      // Ensure an error storing one upload doesn’t prevent storing the rest.
      const results = await Promise.allSettled(files.map(fileUpload));
      return results.reduce((storedFiles, { value, reason }) => {
        if (value) storedFiles.push(value);
        // Realistically you would do more than just log an error.
        else console.error(`Failed to store upload: ${reason}`);
        return storedFiles;
      }, []);
    },
  }
}

module.exports = {
  Upload
}