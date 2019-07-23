const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALTROUNDS = 10;
const JWTSECRET = process.env.JWTSECRET;

module.exports.createUser = (params) => {
    return exports.getUser({ email: params.email }).then(function (user) {
        if (user) { throw new Error("User exists"); }
        return bcrypt.hash(params.password, SALTROUNDS);
    }).then(function (hash) {
        params.password = hash;
        return new User(params).save();
    });
};

// exports.createUser({ name: "Arun", email: "arun@gmail.com", password: "1234" });

module.exports.getUser = (params, project) => {
    return User.findOne(params, project).lean().exec();
}

module.exports.updateUser = (params, data) => {
    return User.updateOne(params, data).exec();
}

module.exports.getUsers = (params, project = { password: 0 }) => {
    let query = { ...params };
    if (params.search) {
        query['$or'] = [
            { name: { $regex: params.search, $options: 'i' } },
            { email: { $regex: params.search, $options: 'i' } },
        ]
        delete query.search;
    }
    if(params.id) {
        query = { _id: params.id };
        return exports.getUser(query, { password: 0 });
    }
    return User.find(query, project).lean().exec();
}

module.exports.getUsersPaginate = (params, project = { password: 0 }) => {
    let query = {};
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const sortField = params.sortField ? params.sortField : '_id';
    const sortDir = params.sortDir ? params.sortDir : '-1';
    const sort = { [sortField]: parseInt(sortDir) }
    
    if (params.search) {
        query['$or'] = [
            { name: { $regex: params.search, $options: 'i' } },
            { email: { $regex: params.search, $options: 'i' } },
        ]
    }
    if(params.role) {
        query.role = parseInt(params.role);
    }
    if(params.id) {
        query = { _id: params.id };
        return exports.getUser(query, project);
    }
    return User.paginate(query, project, { page, limit, sort });
}

module.exports.authenticate = async (params) => {
    const user = await exports.getUser({ email: params.email });

    if (!user) {
        return Promise.reject();
    }

    const match = await bcrypt.compare(params.password, user.password);

    if (!match) {
        return Promise.reject();
    }

    return jwt.sign({ _id: user._id, name: user.name }, JWTSECRET);
}