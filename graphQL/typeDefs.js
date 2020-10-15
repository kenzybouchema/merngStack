// GQL est une sous dépendances d'apollo-server
const {gql} = require('apollo-server')

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts:  [Post]

    }
`;