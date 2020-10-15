// .. je remonte de 1 .. puis de deux puis je descends dans models et post:
//  
//  |
//  |_graphQL
//  |   |_resolvers
//  |       |_ post.js <-- je suis ici
//  |_models
//      |_Post.js <-- j'importe celui-ci
//
const Post = require('../../models/Post')

module.exports = {
    QueryPosts:{
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts
            }catch(err){
                throw new Error(err)
            }
        }
    }
}