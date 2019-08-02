const Todo = require('../models/todo');

module.exports.createTodo = (params) => {
    return new Todo(params).save();
};

module.exports.getTodo = (params, project = {}) => {
    return Todo.findOne(params, project).lean().exec();
}

module.exports.updateTodo = (params, data) => {
    return Todo.updateOne(params, data).exec();
}

module.exports.getTodos = (params, project = {}) => {
    let query = { ...params };
    if (params.search) {
        query['$or'] = [
            { title: { $regex: params.search, $options: 'i' } },
            { description: { $regex: params.search, $options: 'i' } },
        ]
        delete query.search;
    }
    if(params.id) {
        query = { _id: params.id };
        return exports.getTodo(query);
    }
    return Todo.find(query, project).lean().exec();
}

module.exports.getTodosPaginate = (params, project = {}) => {
    let query = {};
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const sortField = params.sortField ? params.sortField : '_id';
    const sortDir = params.sortDir ? params.sortDir : '-1';
    const sort = { [sortField]: parseInt(sortDir) }
    query.user = params.user;
    
    if (params.search) {
        query['$or'] = [
            { title: { $regex: params.search, $options: 'i' } },
            { description: { $regex: params.search, $options: 'i' } },
        ]
    }
    if(params.status) {
        query.status = parseInt(params.status);
    }
    if(params.date) {
        query.date = {};
        query.date['$gte'] = new Date(`${params.date}T00:00:00.000Z`);
        query.date['$lt'] = new Date(`${params.date}T23:59:50.000Z`);
    }
    if(params.id) {
        query = { _id: params.id };
        return exports.getTodo(query, project);
    }
    return Todo.paginate(query, project, { page, limit, sort });
}
