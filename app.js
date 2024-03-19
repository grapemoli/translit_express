var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bibleRouter = require('./routes/bible');
var savedRouter = require('./routes/saved');
var accountRouter = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bible', bibleRouter);
app.use('/bible/results', bibleRouter);
app.use('/bible/translate', bibleRouter);
app.use('/account', accountRouter);
app.use('/account/login', accountRouter);
app.use('/account/create', accountRouter);
app.use('/account/password', accountRouter);
app.use('/saved', savedRouter);
app.use('/users', usersRouter);

// middleware, exposing paths
app.use('/@material', express.static(__dirname + '/node_modules/@material/'));
app.use('/@material-ui', express.static(__dirname + '/node_modules/@material-ui/'));
app.use('/materialize-css', express.static(__dirname + '/node_modules/materialize-css/'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
