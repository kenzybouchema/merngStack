module.exports.validateRegisterInput = 
(username, email, password, confirmPassword ) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username  
        = 'Le nom d\'utilisateur ne peut être vide';
    }
    if(email.trim() === ''){
        errors.email 
        = 'L\'email ne peut être vide';
    }else{ 
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(regEx)){
            errors.email 
            = 'L\'addresse doit être valide';
        }
    }
    if(password === ''){
        errors.password 
        = 'Le mot de passe ne peut être vide';
    }
    if( password !== confirmPassword){
        errors.confirmPassword 
        = 'Les deux mots de passes doivent être identiques'
    }
    return { errors, valid: Object.keys(errors).length < 1}
};

module.exports.validateLoginInput = (_,{username, password}) => {
    // console.log('userValidator#validateLoginInput#username:' + username);
    // console.log('userValidator#validateLoginInput#password:' + password);
    const errors = {};
    if(username.trim() === ''){
        errors.username  
        = 'Utilisateur ne peut être vide';
    }
    if(password.trim() === ''){
        errors.password  
        = 'Le mot de passe ne peut être vide';
    }
    // console.log(
    //     'userValidator#errors:' 
    //     + errors 
    //     +"- errors.username: "
    //     + errors.username
    //     +"- errors.password: " 
    //     + errors.password
    // );
    return { errors, valid: Object.keys(errors).length < 1}
}