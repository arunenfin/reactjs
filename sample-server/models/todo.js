const mongoose = require('mongoose');
const mongoosePaginate = require('./paginate.plugin');

const todoSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, default: '' },
  status: { type: Number, default: 0 }, // 0 = New, 1 = In Progress, 2 = Completed
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

todoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Todo', todoSchema);