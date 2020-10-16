const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

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
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
        }
    }
} 