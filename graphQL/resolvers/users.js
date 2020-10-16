const User = require('../../models/User')
// Ici on impléemente ce qu'on a défini dans le fichier typeDefs.js
module.exports = {
    Mutation:{
        register(parent, 
                {username, password, confirmPassword, email}, 
                context, 
                info){
            // TODO : Valider les données de l'user
            // TODO : S'assurer que l'utilisateur n'existe pas
            // TODO : Crypter le mot de passe
        }
    }
} 