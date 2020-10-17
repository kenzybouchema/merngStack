/* ----------------------------------------------*/
/* Les dépendances ------------------------------*/
/* ----------------------------------------------*/

// Import d'appolo-server
const{ ApolloServer } = require('apollo-server');

//  GraphQL est desormais inutile puisque tout se fait dans graphQL/typeDefs.js
// const gql  = require('graphql-tag');

// Ajout de mangoose pour la BD:
const mongoose = require('mongoose');

/* ----------------------------------------------*/
/* Les imports relatifs -------------------------*/
/* ----------------------------------------------*/
const typeDefs = require('./graphQL/typeDefs');
// Les lignes ci-dessous sont remplacé par l'import des resolvers
//  const Post = require('./models/Post');
//  const User = require('./models/User');
const resolvers = require('./graphQL/resolvers');

// Ajout de la BD
const { MONGODB } = require('./config.js');

// On définit notre serveur 
const server = new ApolloServer({
    typeDefs, resolvers
});

// Dans le terminal lancer la commande :  node index
// Cela devrait afficher le message contenu dans la fonction log: 
// Pour arrêter le serveur CTRL + C
server.listen({port:5000})
.then(
    // 
    (res) => { 
        console.log(`Le serveur est disponible à cette adresse :${res.url}`)
    }
);

mongoose
.connect(MONGODB, {useNewUrlParser:true})
.then(() => {console.log('MongoDB Connected to:' + MONGODB)})


//---------------------------------------------------------------------------------------------------------------
//  PROBLEMES RENCONTRES: 

//  1) Fautes de frappes dans la définition du resolver il fallait remplacer le "=" par ":"

//      PS C:\Users\Kenzy\Desktop\merngStack> node index
//      C:\Users\Kenzy\Desktop\merngStack\index.js:13
//              sayhi= () => 'Hello World!'
//              ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//      
//      SyntaxError: Invalid shorthand property initializer
//          at Module._compile (internal/modules/cjs/loader.js:895:18)
//          at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
//          at Module.load (internal/modules/cjs/loader.js:815:32)
//          at Function.Module._load (internal/modules/cjs/loader.js:727:14)
//          at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
//          at internal/main/run_main_module.js:17:11
//      PS C:\Users\Kenzy\Desktop\merngStack>

// 2) Le nom du module est pas bon c'est "apollo-server" et non pas "appolo-server"

// internal/modules/cjs/loader.js:800
//     throw err;
//     ^
// 
// Error: Cannot find module 'appolo-server'
// Require stack:
// - C:\Users\Kenzy\Desktop\merngStack\index.js
//     at Function.Module._resolveFilename (internal/modules/cjs/loader.js:797:15)
//     at Function.Module._load (internal/modules/cjs/loader.js:690:27)
//     at Module.require (internal/modules/cjs/loader.js:852:19)
//     at require (internal/modules/cjs/helpers.js:74:18)
//     at Object.<anonymous> (C:\Users\Kenzy\Desktop\merngStack\index.js:2:25)
//     at Module._compile (internal/modules/cjs/loader.js:959:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
//     at Module.load (internal/modules/cjs/loader.js:815:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:727:14)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10) {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: [ 'C:\\Users\\Kenzy\\Desktop\\merngStack\\index.js' ]
// }

// 3) Identique  à 2) : 
// 
// C:\Users\Kenzy\Desktop\merngStack\index.js:18
// const server = new AppoloServer({
//                ^
// 
// TypeError: AppoloServer is not a constructor
//     at Object.<anonymous> (C:\Users\Kenzy\Desktop\merngStack\index.js:18:16)
//     at Module._compile (internal/modules/cjs/loader.js:959:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
//     at Module.load (internal/modules/cjs/loader.js:815:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:727:14)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
//     at internal/main/run_main_module.js:17:11

// 4) il manquait les parenthese entourant "res", et la virgule en place du "n" de "listen" 
// 
// C:\Users\Kenzy\Desktop\merngStack\index.js:23
// server.liste,({port:500}).then(res => { console.log(`Le serveur est disponible à cette adresse :${res.url}`)});
//                           ^
// 
// TypeError: {(intermediate value)}.then is not a function
//     at Object.<anonymous> (C:\Users\Kenzy\Desktop\merngStack\index.js:23:27)
//     at Module._compile (internal/modules/cjs/loader.js:959:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
//     at Module.load (internal/modules/cjs/loader.js:815:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:727:14)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
//     at internal/main/run_main_module.js:17:11
// PS C:\Users\Kenzy\Desktop\merngStack> 




