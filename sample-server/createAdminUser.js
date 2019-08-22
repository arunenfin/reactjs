require('dotenv').config()

const mongoose = require('mongoose');
const adminService = require('./services/admin.service');

const DB = process.env.DB;

mongoose.connect(DB, { autoIndex: false, useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to MongoDB")
});

adminService.createAdmin({ name: 'Admin User', email: 'admin@gmail.com', password: '123456ab' })
  .then(result => {console.log(result);  process.exit();})
  .catch(e => {console.log(e); process.exit(1);});