var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todospaceRouter = require('./routes/todospace');
var workspaceRouter = require('./routes/workspace');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todospace', todospaceRouter);
app.use('/workspace', workspaceRouter);

module.exports = app;
