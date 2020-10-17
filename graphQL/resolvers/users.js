const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// La clé secrète est dans le fichier de config
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');

// Ici on impléemente ce qu'on a défini dans le fichier typeDefs.js
module.exports = {
    Register:{
        async registerUser( // async car elle retourne une promesse
                parent, // le parent est obligatoire
                {
                   registerInput: {username, password, confirmPassword, email}
                },
                // context, // pas obligatoire
                // info // pas obligatoire
            ){
                // TODO : Valider les données de l'user

                // TODO : S'assurer que l'utilisateur n'existe pas
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
                // TODO : Crypter le mot de passe
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
                
                const token = jwt.sign({
                    id: res.id,
                    email: res.email,
                    username: res.username
                }, 
                SECRET_KEY,
                {expiresIn: '1h'}
                );

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