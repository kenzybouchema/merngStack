const User = require('../../models/User')

module.exports = {
    QueryUsers:{
        async getUsers(){
            try{
                const users = await User.find();
                return users
            }catch(err){
                throw new Error(err)
            }
        }
    }
}