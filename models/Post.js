const { model, Schema } = require('mongoose');


const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    // Une liste de commentaire
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    // Une liste de likes
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    // Je ne comprends pas cette partie !! 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);