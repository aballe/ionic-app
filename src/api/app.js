var express        = require('express');
var app            = express();
var userController = require('./entities/user/userController');

app.use('/api', userController);

module.exports = app;
