const mongoose = require('mongoose');
const mongoosePaginate = require('./paginate.plugin');

const userSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    role: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
    password: { type: String, default: '' },
    avatar: { type: String, default: '' }
},{
    timestamps: true
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);