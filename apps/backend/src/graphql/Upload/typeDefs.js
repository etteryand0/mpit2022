const { default: gql } = require('graphql-tag')

const Upload = gql`
  scalar FileUpload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    singleUpload(file: FileUpload!): File!
    multiUpload(files: [FileUpload!]!): [File!]!
  }
`

module.exports = {
  Upload
}