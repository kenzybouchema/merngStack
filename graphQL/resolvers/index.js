// Imports des resolvers qui sont dans le même chemin
const postsResolvers = require('./posts');
const usersResolvers = require('./users');

// function myFunc(x, y, ...params) { // used rest operator here
//     console.log(x);
//     console.log(y);
//     console.log(params);
//   }
//   
//   var inputs = ["a", "b", "c", "d", "e", "f"];
//   myFunc(...inputs); // used spread operator here
//----------------------------------------------------------------
//                      Console:
//----------------------------------------------------------------
//   // "a"
//   // "b"
//   // ["c", "d", "e", "f"]
//----------------------------------------------------------------


module.exports = {
    Query:{
        ...postsResolvers.QueryPosts,
        ...usersResolvers.QueryUsers
    },
    Mutation:{
        ...usersResolvers.Register
    }
}