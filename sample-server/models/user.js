const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    role: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
    password: { type: String, default: '' }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);