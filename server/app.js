const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const passportJWT = require('./utils/passport-jwt')

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const todospaceRouter = require('./routes/todospace');
const workspaceRouter = require('./routes/workspace');
const settingRouter = require('./routes/setting');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(passport.initialize())
passportJWT(passport)

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/todospace', todospaceRouter);
app.use('/workspace', workspaceRouter);
app.use('/setting', settingRouter);

module.exports = app;
