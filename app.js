var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.header('Access-Control-Max-Age', '1000');
  res.header('Access-Control-Allow-Headers', 'Auth-Token, x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
  next();
}).options('*', function(req, res){
  res.end();
});

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    console.log(err);
    res.send('error', err.message);
});

module.exports = app;
