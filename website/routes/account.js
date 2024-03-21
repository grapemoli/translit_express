var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
var User = require('../models/user');

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
    res.render('account/login', {title: 'Sign In'});
});

router.post('/login', upload.none(), async function (req, res, next) {
    // Check that the username exists, and the password are correct. If so, login. If not,
    // then show in a validation message.
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Find if the user exists.
        const user = await User.findOne({username: username});

        if (!!!user) {
            // TODO: make this a validation message rather than a JSON response.
            return res.status(401).json({
                status: "failed",
                data: [req.body.username, req.body.password],
                message:
                    "This user does not exist.",
            });
        }

        // Find if the password matches the user.
        const p = '$2b$10$DPaPO3edQnDGzhua7Udymeee97PajGOeoSuUETAzb7sSw62rW0z.6';
        const isValid = bcrypt.compare (password, p);

        if (isValid) {
            res.render('account/index', {title: 'Translit | Account'});
        }
        else {
            // TODO validation message rather JSON response.
            return res.status(401).json({
                status: "Failed",
                data: [],
                message:
                    "Incorrect password.",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [err.message],
            message: "Internal Server Error",
        });
    }
    res.end();
});

router.get('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});

router.post('/password', upload.none(), function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});


module.exports = router;