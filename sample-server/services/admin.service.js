const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const lang = require('../lib/en.json');

const SALTROUNDS = 10;
const JWTSECRET = process.env.JWTSECRET;

module.exports.createAdmin = (params) => {
    return exports.getAdmin({ email: params.email }).then(function (user) {
        if (user) { throw new Error(lang.USER_REG); }
        return bcrypt.hash(params.password, SALTROUNDS);
    }).then(function (hash) {
        params.password = hash;
        return new Admin(params).save();
    });
};

// exports.createAdmin({ name: "Arun", email: "arun@gmail.com", password: "1234" });

module.exports.getAdmin = (params, project) => {
    return Admin.findOne(params, project).lean().exec();
}

module.exports.updateAdmin = (params, data) => {
    return Admin.updateOne(params, data).exec();
}

module.exports.getAdmins = (params, project = { password: 0 }) => {
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
        return exports.getAdmin(query, { password: 0 });
    }
    return Admin.find(query, project).lean().exec();
}

module.exports.getAdminsPaginate = (params, project = { password: 0 }) => {
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
        return exports.getAdmin(query, project);
    }
    return Admin.paginate(query, project, { page, limit, sort });
}

module.exports.authenticate = async (params) => {
    const user = await exports.getAdmin({ email: params.email });

    if (!user) {
        throw new Error(lang.USER_NF);
    }

    const match = await bcrypt.compare(params.password, user.password);

    if (!match) {
        throw new Error(lang.INVALIDPWD);
    }

    return jwt.sign({ _id: user._id, name: user.name, avatar: user.avatar }, JWTSECRET, {audience: "admin"});
}