const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALTROUNDS = 10;
const JWTSECRET = process.env.JWTSECRET;

module.exports.createUser = (params) => {
    return exports.getUser({ email: params.email }).then(function(user){
        if(user) { throw new Error("User exists"); }
        return bcrypt.hash(params.password, SALTROUNDS);
    }).then(function(hash) {
        params.password = hash;
        return new User(params).save();
    });
};

// exports.createUser({ name: "Arun", email: "arun@gmail.com", password: "1234" });

module.exports.getUser = (params, project) => {
    return User.findOne(params, project).lean().exec();
}

module.exports.getUsers = (params, project = { password: 0 }) => {
    return User.find(params, project).lean().exec();
}

module.exports.authenticate = async (params) => {
    const user = await exports.getUser({ email: params.email });

    if(!user) {
        return Promise.reject();
    }
    
    const match = await bcrypt.compare(params.password, user.password);
 
    if(!match) {
        return Promise.reject();
    }

    return jwt.sign({ _id: user._id, name: user.name }, JWTSECRET);
}