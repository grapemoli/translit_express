var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
var User = require('../models/user');

// Error codes.
const DNE = "300";                      // Account DNE.
const EXISTS = "350";                   // Account exists.
const WRONG_PASSWORD = "400";           // Account exists, but wrong password.
const UNDEFINED = "500";                // Undefined issue.
const OK = "1";                         // Acknowledged / OK / Good request.
const RE_OK ="2";                       // Good request, but the user needs to sign in again.


// Route: account
router.get('/', function (req, res, next) {
    res.render('account', {title: 'Translit | Account', username: req.session.username, snackbar: ''});
});

router.post('/', upload.none(),function (req, res, next) {
    // Try to update the username. We know that if this operation fails, it's because the username
    // is not unique.
    if (req.body.username === '') {
        res.render('account', {title: 'Translit | Account', username: req.session.username, snackbar: 'Username was not changed.'});
    }
    else {
        User.init().then(() => {
            User.findOneAndUpdate({username: req.session.username}, {username: req.body.username}).then(()=>{
                req.session.username = req.body.username;
                // Successfully changed the username.
                res.render('account', {title: 'Translit | Account', username: req.session.username, snackbar: 'Successfully changed username.'});
            }).catch((err)=>{
                // Something went wrong.
                res.render('account', {title: 'Translit | Account', username: req.session.username, snackbar: 'This username is already taken. Try again.'});
            });
        });
    }
});

router.get('/create', function (req, res, next) {
    if(req.session.isAuth) {
        // User who are logged in cannot access this page.
        req.app.locals.snackbar = 'You are logged in.';
        res.redirect('/');
    }
    else {
        res.render('account/create', {title: 'Create Account', error: ''});
    }
});

router.post('/create', upload.none(), function (req, res, next) {
    try {
        // Check that the username does not exist. Usernames must be unique.
        const user = User.findOne({username: req.body.username}).then(async (result) => {
            if (!!!result) {
                // User does not exist. Make the model, and redirect the user to the login.
                const salt = bcrypt.genSaltSync(10);
                await bcrypt
                    .hash(req.body.password, salt)
                    .then(hash => {
                        const newUser = new User({
                            username:req.body.username,
                            password: hash
                        });

                        newUser.save().then(() => {
                            // Successfully made the account.
                            res.redirect(`login/${RE_OK}`);
                        });
                    })
                    .catch((err) => {
                        // Something went wrong.
                        res.render('account/create', {title: 'Create Account', error: err.message})
                    });
            }
            else {
                // User already exists.
                res.render(`account/create`, {title: 'Create Account', error: 'This username is taken.'});
            }
        });
    } catch (err) {
        // Something went wrong.
        res.render('account/create', {title: 'Create Account', error: err.message});
    }
});

router.get('/login', function (req, res, next) {
    if (req.session.isAuth) {
        // Logged in users do not get access to this page.
        req.app.locals.snackbar = 'You are already logged in.';
        res.redirect('/');
    }
    else {
        res.render('account/login', {title: 'Sign In', error: ''});
    }

});

router.post('/login', upload.none(), async function (req, res, next) {
    // Check that the username exists, and the password are correct. If so, login. If not,
    // then show in a validation message.
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Find if the user exists.
        const user = User.findOne({username: username}).then(async(result) => {
            if (!!!result) {
                // User does not exist.
                res.render('account/login', {title: 'Sign In', error: 'This account does not exist.'});
            }
            else {
                // User exists.
                await bcrypt.compare(password, result.password).then((valid) => {
                    if (valid) {
                        // Credentials are valid.
                        req.session.isAuth = true;
                        req.session.username = result.username;
                        req.app.locals.snackbar = 'Successfully signed in.';
                        res.redirect('/');
                    }
                    else {
                        // Username exists but the password is wrong.
                        res.render('account/login', {title: 'Sign In', error: 'The password was incorrect.'});
                    }
                });
            }
        });
    }
    catch (err) {
        res.render('account/login', {title: 'Sign In', error: err.message});
    }
});

router.get('/login/:id', function (req, res){
    if (req.session.isAuth) {
        // Logged in users do not get access to this page.
        req.app.locals.snackbar = 'You are logged in.';
        res.redirect('/');
    }
    else {
        var error_msg = '';

        if (req.params['id'] === OK) {
            // Successful logins go to the main page.
            // Do nothing.
        }
        else {
            if (req.params['id'] === DNE) {
                error_msg = 'This user does not exist.';
            }
            else if (req.params['id'] === WRONG_PASSWORD) {
                error_msg = 'This password is incorrect.';
            }
            else if (req.params['id'] === RE_OK) {
                error_msg = 'Account created! Please sign in with your new credentials.';
            }
            else {
                error_msg = 'Something went wrong. Try again later.';
            }

            res.render('account/login', {title: 'Sign In', error: error_msg});
        }
    }
});

router.post('login/:id', function(req, res){
    res.redirect(308, 'account/login');
});


router.get('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password', username: req.session.username, error: ''});
});

router.post('/password', upload.none(), async function (req, res, next) {
    // Check that the old password is right, then change to the new password.
    console.log(req.body.newPassword);
    console.log(req.body.oldPassword);
    const salt = bcrypt.genSaltSync(10);

    await User.findOne({username: req.session.username}).then((user) => {
        // Check the hash and input match.
        bcrypt.compare(req.body.oldPassword, user.password).then(async (result) => {
            if (result) {

                // User typed in the right password.
                await bcrypt.hash(req.body.newPassword, salt).then((newHash) => {

                    // Update the field.
                    User.findOneAndUpdate({username:req.session.username}, {password: newHash}).then(() => {
                        req.app.locals.snackbar = 'Password has been updated.';
                        res.redirect('/');
                    });
                });
            }
            else {
                // User typed in the incorrect password for their account.
                res.render('account/password', {title: 'Change Password', username: req.session.username, error: 'Incorrect password, failed to change password.'});
            }
        });
    }).catch((err) => {
        // Something went wrong.
        res.render('account/password', {title: 'Change Password', username: req.session.username, error: 'Something went wrong. Try again later.'});
    });
});

router.post('/logout', function(req, res){
    // Remove the cookie and return to the main page.
    req.session.username = null;
    req.session.isAuth = false;
    req.session = null;

    req.app.locals.snackbar = 'Signed out.';
    res.redirect('/');
});


module.exports = router;