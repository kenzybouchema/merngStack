// GQL est une sous dépendances d'apollo-server
const {gql} = require('apollo-server')

// Une input est ce que l'on donne à resolver pour qu'il nous retounr une certaine 
// donnée
// On a créée une mutation register qui prend comme argument registerInput 
// qui est de type RegisterInput et qui retourne un utilisateur User

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type User{
        id: ID!
        email: String!
        createdAt: String!
        username: String!
        password: String!
        token: String!
    }
    type Query{
        getPosts: [Post]
        getUsers: [User]
    }
    type Mutation{
        registerUser(registerInput: RegisterInput): User!
        loginUser(username: String!, password: String!): User!
    }
`;