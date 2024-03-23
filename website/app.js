var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('cookie-session');

var User = require(__dirname + '/models/user');
var Book = require(__dirname + '/models/book');
var Saved = require(__dirname + '/models/saved');

// Dependencies.
var indexRouter = require('./routes/index');
var bibleRouter = require('./routes/bible');
var savedRouter = require('./routes/saved');
var accountRouter = require('./routes/account');


var app = express();


// Set up event emitters. These will tell the console of any database problems if they arise.
mongoose.connection.on('open', () => console.log('+++ Open connection to MONGODB +++ '));
mongoose.connection.on('connected', () => console.log('+++ Connected to MONGODB +++'));
mongoose.connection.on('disconnected', () => console.log('--- Disconnected from MONGODB ---'));
mongoose.connection.on('reconnected', () => console.log('... Reconnected to MONGODB ...'));
mongoose.connection.on('disconnecting', () => console.log('--- Disconnecting from MONGODB ---'));
mongoose.connection.on('close', () => console.log('--- Closed connection to MONGODB. ---'));


// Connect Mongoose to the database. This also populates the Models.
async function getDatabase() {
    // Database configuration.
    var configData = require('./config/connection');
    const connectionInfo = await configData.getConnectionInfo();
    var db = await mongoose.connect(connectionInfo.DATABASE_URL);
}
getDatabase();


// Set cookie for auth.
app.use(session({
    name: 'translite-cookie',
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000             // 24 hours
}));


// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bible', bibleRouter);
app.use('/bible/result', bibleRouter);
app.use('/bible/translate', bibleRouter);
app.use('/account', accountRouter);
app.use('/account/login', accountRouter);
app.use('/account/create', accountRouter);
app.use('/account/password', accountRouter);
app.use('/saved', savedRouter);

// Middleware, exposing redirecting html/css paths.
app.use('/@material', express.static(path.join(__dirname, 'node_modules', '@material')));
app.use('/@material-ui', express.static(path.join(__dirname, 'node_modules', '@material-ui')));
app.use('/materialize-css', express.static(path.join(__dirname, 'node_modules', 'materialize-css')));
app.use('/path', express.static(path.join(__dirname, 'node_modules', 'path')));


// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler.
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page.
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
