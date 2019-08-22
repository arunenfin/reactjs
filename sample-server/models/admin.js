const mongoose = require('mongoose');
const mongoosePaginate = require('./paginate.plugin');

const adminSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    status: { type: Number, default: 1 },
    password: { type: String, default: '' },
    avatar: { type: String, default: '' }
},{
    timestamps: true
});

adminSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Admin', adminSchema);