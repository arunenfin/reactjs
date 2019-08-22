var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var ejwt = require('express-jwt');
var cors = require('cors');

const JWTSECRET = process.env.JWTSECRET;
const DB = process.env.DB;

mongoose.connect(DB, { autoIndex: false, useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to MongoDB")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins');
var todosRouter = require('./routes/todos');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/admins', ejwt({secret: JWTSECRET, audience: "admin"}), adminsRouter);
app.use('/users', ejwt({secret: JWTSECRET, audience: ["admin", "user"]}), usersRouter);
app.use('/todos', ejwt({secret: JWTSECRET, audience: "user"}), todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
  } else {
    // render the error page
    res.status(err.status || 500);
  }
  res.json({ success: false });
});

module.exports = app;
