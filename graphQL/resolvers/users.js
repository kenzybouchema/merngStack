const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// La clé secrète est dans le fichier de config
const { SECRET_KEY } = require('../../config');
// On importe cette erreur mais je pense qu'il faudrait plutôt créer
// une erreur spécialement pour notre cas  
const { UserInputError } = require('apollo-server');
const {validateRegisterInput, validateLoginInput} = require('../../util/userValidator');

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, 
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// Ici on impléemente ce qu'on a défini dans le fichier typeDefs.js
module.exports = {
    Query:{
        async getUsers(){
            try{
                const users = await User.find();
                return users
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:{
        async loginUser(username, password){
            const {errors, valid} = validateLoginInput(username, password);
            const user = await User.findOne({username});
            if(!user){
                throw new UserInputError('IdentifiantsIncorrects', {errors});
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
            throw new UserInputError('IdentifiantsIncorrects', {errors});
            }
            const token = generateToken(user);
        },
        async registerUser( // async car elle retourne une promesse
                parent, // le parent est obligatoire
                {
                   registerInput: {username, password, confirmPassword, email}
                },
                // context, // pas obligatoire
                // info // pas obligatoire
            ){
                // Valider les données de l'user
                // TODO penser à refactorer pour qu'il n'y est qu'un objet en arg.
                const { valid, errors} =  
                validateRegisterInput(username, email, password, confirmPassword);
                if(!valid){
                    throw new UserInputError('Errors', {errors});
                }
                //S'assurer que l'utilisateur n'existe pas
                const user = await User.findOne({username});
                console.log(user);
                if(user){
                    throw new UserInputError(
                        'Un utilisateur avec ce username existe déjà',
                        {errors:{
                                username: 'Utilisateur existant'
                            }
                        }
                    )
                }
                //Crypter le mot de passe
                password = await bcrypt.hash(password,12); // bcryptJS est une promesse
                console.log(password);
                // On crée un nouveau User avec le mdp chiffré
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                })
                console.log(newUser);
                // On enregistre le newUser
                const res = await newUser.save();
                
                const token = generateToken(res)

                return{
                    // ... signifie que l'on spread les données 
                    ...res._doc,
                    // <=> email, createdAt, username, password
                    id: res._id,
                    token
                };
            }
        }
    } 