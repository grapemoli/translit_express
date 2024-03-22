var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
var User = require('../models/user');

// Error codes.
const DNE = "300";
const WRONG_PASSWORD = "400";
const UNDEFINED = "500";
const OK = "1"


// Route: account
router.get('/', function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.post('/', upload.none(),function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.get('/create', function (req, res, next) {
    res.render('account/create', {title: 'Create Account'});
});

router.post('/create', upload.none(), function (req, res, next) {
    res.render('account/create', {title: 'Create Account'});
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
        const user = await User.findOne({username: username})

        if (!!!user) {
            res.redirect(`/account/login/${DNE}`);
            // Uncomment if you want the JSON response.
            /*
            return res.status(401).json({
                status: "failed",
                data: [req.body.username, req.body.password],
                message:
                    "This user does not exist.",
            });
             */
        }
        else {
            // Find if the password matches the user.
            const isValid = await bcrypt.compare (password, user.password);
            if (isValid) {
                // Valid password. Redirect home.
                res.redirect('/');
            }
            else {
                res.redirect(`/account/login/${WRONG_PASSWORD}`);
                // Uncomment if you would rather the JSON response be sent.
                /*
                return res.status(401).json({
                    status: "Failed",
                    data: [],
                    message:
                        "Incorrect password.",
                });
                 */
            }
        }
    }
    catch (err) {
        res.redirect(`/account/login/${UNDEFINED}`);
        // Uncomment if you want the JSON response.
        /*
        res.status(500).json({
            status: "error",
            code: 500,
            data: [err.message],
            message: "Internal Server Error",
        });
         */
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