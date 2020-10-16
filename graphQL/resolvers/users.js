const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// La clé secrète est dans le fichier de config
const { SECRET_KEY } = require('../../config');

// Ici on impléemente ce qu'on a défini dans le fichier typeDefs.js
module.exports = {
    Mutation:{
        async register( // async car elle retourne une promesse
            parent, 
            {username, password, confirmPassword, email}, 
            context, 
            info){
                // TODO : Valider les données de l'user

                // TODO : S'assurer que l'utilisateur n'existe pas

                // TODO : Crypter le mot de passe
                password = await bcrypt.hash(password,12); // bcryptJS est une promesse
                // On crée un nouveau User avec le mdp chiffré
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                })
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
                    ...res._doc,
                    id: res._id,
                    token
                };
            }
        }
    } 