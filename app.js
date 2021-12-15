var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var cors=require ("cors");
var logger = require('morgan');
var bodyParser=require("body-parser")
var path= require("path");
var passport = require('passport');
var session = require("express-session");
var models = require("./models");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'fitness-frontend/src/pages',)));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
app.use(cookieParser());
app.use(session({
    secret: "some Secret",
    saveUninitialized: false,
    resave: true,
    cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

});
models.sequelize.sync().then(function () {
    console.log("DB Sync'd up")
  });
module.exports = app;
