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
    res.render('account', {title: 'Translit | Account'});
});

router.post('/', upload.none(),function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.get('/create', function (req, res, next) {
    res.render('account/create', {title: 'Create Account', error: ''});
});

router.post('/create', upload.none(), function (req, res, next) {
    try {
        // Check that the username does not exist. Usernames must be unique.
        const user = User.findOne({username: req.body.username}).then(async (result) => {
            if (!!!result) {
                // User does not exist. Make the model, and redirect the user to the login.
                await bcrypt
                    .hash(req.body.password, 10)
                    .then(hash => {
                        const newUser = new User({
                            username:req.body.username,
                            password: hash
                        });

                        newUser.save().then(() => {
                            res.redirect(`login/${RE_OK}`);
                        });
                    })
                    .catch((err) => {
                        res.render('account/create', {title: 'Create Account', error: err.message})
                    });
            }
            else {
                // User already exists.
                res.render(`account/create`, {title: 'Create Account', error: 'This username is taken.'});
            }
        });
    } catch (err) {
        res.render('account/create', {title: 'Create Account', error: err.message});
    }
});

router.get('/login', function (req, res, next) {
    res.render('account/login', {title: 'Sign In', error: ''});
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
                const isValid = await bcrypt.compare(password, result.password).then((valid) => {
                    if (valid) {
                        // Credentials are valid.
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
});

router.post('login/:id', function(req, res){
    res.redirect(308, 'account/login');
});


router.get('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});

router.post('/password', upload.none(), function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});


module.exports = router;