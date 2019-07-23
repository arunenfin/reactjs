function paginate(query, project, options = { page: 1, limit: 10, sort: { _id: -1 }, populate: null }) {
  const { page, limit, sort } = options;
  const skip = (page - 1) * limit;
  let findQuery = this.find(query, project);

  if(options.populate) {
    findQuery.populate(options.populate)
  }

  return Promise.all([
    findQuery.sort(sort).skip(skip).limit(limit).lean().exec(),
    this.countDocuments(query)
  ]).then(result => {
    let data = {};
    data.docs = result[0];
    data.total = result[1];
    data.pages = Math.ceil(result[1] / limit) || 1;
    data.page = page;
    data.limit = limit;
    return data;
  })
}

module.exports = function(schema) {
  schema.statics.paginate = paginate;
};